import React, { ReactNode } from 'react';

// Povolené párové tagy a element, na který se přeloží.
const PAIR_TAGS: Record<string, 'strong' | 'em' | 'u' | 's' | 'small'> = {
    b: 'strong',
    strong: 'strong',
    i: 'em',
    em: 'em',
    u: 'u',
    s: 's',
    strike: 's',
    small: 'small',
};

// Povolené nepárové tagy.
const VOID_TAGS = new Set(['br', 'hr']);

interface ParsedTag {
    name: string;
    closing: boolean;
    end: number; // index prvního znaku za '>'
}

function isNameChar(ch: string) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9');
}

function isSpace(ch: string) {
    return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';
}

// Přečte tag začínající na pozici `start` (kde je '<').
// Vrátí null, pokud to není platný tag - pak se '<' vypíše jako obyčejný znak.
function readTag(src: string, start: number): ParsedTag | null {
    let i = start + 1;
    let closing = false;

    if (src[i] === '/') {
        closing = true;
        i++;
    }

    const nameStart = i;
    while (i < src.length && isNameChar(src[i])) i++;
    const name = src.slice(nameStart, i).toLowerCase();
    if (!name) return null;

    while (i < src.length && isSpace(src[i])) i++;

    // self-closing zápis: <br /> nebo <br/>
    if (src[i] === '/') {
        i++;
        while (i < src.length && isSpace(src[i])) i++;
    }

    // Atributy nepodporujeme - cokoliv jiného než '>' znamená, že tag neplatí.
    if (src[i] !== '>') return null;

    return { name, closing, end: i + 1 };
}

interface Frame {
    tag: string | null;
    children: ReactNode[];
}

/**
 * Přeloží text s jednoduchými HTML tagy na React elementy.
 * Nepoužívá žádný HTML parser ani dangerouslySetInnerHTML - jen hledá sekvence znaků
 * a staví z nich React strom, takže neznámé tagy zůstanou jako text a nic se nespustí.
 */
export function renderRichText(source: string | null | undefined): ReactNode {
    if (!source) return null;

    const root: Frame = { tag: null, children: [] };
    const stack: Frame[] = [root];
    const top = () => stack[stack.length - 1];

    let text = '';
    let key = 0;
    let i = 0;

    const flushText = () => {
        if (text) {
            top().children.push(text);
            text = '';
        }
    };

    // Uzavře rámce od vrcholu zásobníku až po index `downTo` (včetně) a zabalí je do elementů.
    const closeDownTo = (downTo: number) => {
        while (stack.length > downTo) {
            const frame = stack.pop()!;
            const Element = PAIR_TAGS[frame.tag!];
            top().children.push(<Element key={key++}>{frame.children}</Element>);
        }
    };

    while (i < source.length) {
        if (source[i] !== '<') {
            text += source[i];
            i++;
            continue;
        }

        const tag = readTag(source, i);
        const known = tag && (VOID_TAGS.has(tag.name) || tag.name in PAIR_TAGS);
        if (!tag || !known) {
            // Neplatný nebo nepovolený tag - bereme '<' jako obyčejný znak.
            text += source[i];
            i++;
            continue;
        }

        flushText();

        if (VOID_TAGS.has(tag.name)) {
            if (!tag.closing) {
                top().children.push(tag.name === 'br' ? <br key={key++} /> : <hr key={key++} className="my-3 border-gray-200" />);
            }
            // Případné </br> ignorujeme.
        } else if (!tag.closing) {
            stack.push({ tag: tag.name, children: [] });
        } else {
            // Najdeme poslední otevřený rámec se stejným jménem.
            let idx = -1;
            for (let s = stack.length - 1; s > 0; s--) {
                if (stack[s].tag === tag.name) {
                    idx = s;
                    break;
                }
            }
            if (idx === -1) {
                // Uzavírací tag bez otevíracího - vypíšeme ho jako text.
                text += source.slice(i, tag.end);
                i = tag.end;
                continue;
            }
            // Špatně zanořené tagy nad nalezeným rámcem uzavřeme také.
            closeDownTo(idx);
        }

        i = tag.end;
    }

    flushText();
    closeDownTo(1); // neuzavřené tagy dorovnáme na konci

    return root.children;
}
