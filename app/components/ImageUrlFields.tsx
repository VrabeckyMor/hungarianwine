'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'empty' | 'checking' | 'valid' | 'invalid';
type Result = 'valid' | 'invalid';

const STATUS_TEXT: Record<Status, string> = {
    empty: 'Vlož URL obrázku',
    checking: 'Ověřuji…',
    valid: 'Platné',
    invalid: 'Na této adrese není obrázek',
};

const STATUS_CLASS: Record<Status, string> = {
    empty: 'text-gray-400',
    checking: 'text-amber-600',
    valid: 'text-emerald-600',
    invalid: 'text-red-600',
};

const BORDER_CLASS: Record<Status, string> = {
    empty: 'border-gray-200',
    checking: 'border-amber-300',
    valid: 'border-emerald-400',
    invalid: 'border-red-400',
};

interface ImageUrlFieldsProps {
    values: string[];
    onChange: (values: string[]) => void;
}

/**
 * Seznam URL obrázků produktu. Každá adresa se po zadání ověří tím, že ji prohlížeč
 * zkusí načíst jako obrázek; teprve u ověřené poslední adresy se nabídne další kolonka.
 */
export default function ImageUrlFields({ values, onChange }: ImageUrlFieldsProps) {
    const rows = values.length > 0 ? values : [''];
    const [results, setResults] = useState<Record<string, Result>>({});
    // Výsledky drží i ref, aby ověřovací efekt nemusel záviset na stavu a nerestartoval se.
    const resultsRef = useRef<Record<string, Result>>({});

    const record = useCallback((url: string, result: Result) => {
        if (resultsRef.current[url]) return;
        resultsRef.current = { ...resultsRef.current, [url]: result };
        setResults(resultsRef.current);
    }, []);

    const key = JSON.stringify(rows);
    useEffect(() => {
        const urls = (JSON.parse(key) as string[]).map((url) => url.trim()).filter(Boolean);
        let cancelled = false;
        // Krátká prodleva, ať se neověřuje po každém stisku klávesy.
        const timer = setTimeout(() => {
            urls.forEach((url) => {
                if (resultsRef.current[url]) return;
                const probe = new window.Image();
                probe.onload = () => !cancelled && record(url, 'valid');
                probe.onerror = () => !cancelled && record(url, 'invalid');
                probe.src = url;
            });
        }, 500);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [key, record]);

    const statusOf = (url: string): Status => {
        const trimmed = url.trim();
        if (!trimmed) return 'empty';
        return results[trimmed] ?? 'checking';
    };

    // Další prázdná kolonka se jen vykreslí - do dat se dostane, až do ní někdo něco napíše.
    const lastIsValid = statusOf(rows[rows.length - 1]) === 'valid';
    const displayRows = lastIsValid ? [...rows, ''] : rows;

    const handleRowChange = (index: number, value: string) => {
        const next = [...rows];
        next[index] = value;
        onChange(next);
    };

    const handleRemove = (index: number) => {
        const next = rows.filter((_, i) => i !== index);
        onChange(next.length > 0 ? next : ['']);
    };

    const validCount = rows.filter((url) => statusOf(url) === 'valid').length;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Obrázky produktu</p>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {validCount} platných
                </span>
            </div>

            {displayRows.map((value, index) => {
                const status = statusOf(value);
                return (
                    <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-gray-400 w-10 shrink-0">
                                {index === 0 ? 'Hlavní' : `#${index + 1}`}
                            </span>
                            <input
                                type="text"
                                value={value}
                                placeholder={index === 0 ? 'URL hlavního obrázku *' : 'URL dalšího obrázku'}
                                onChange={(e) => handleRowChange(index, e.target.value)}
                                className={`grow p-3 bg-gray-50 border ${BORDER_CLASS[status]} rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm`}
                            />
                            {status === 'valid' && (
                                <img
                                    src={value.trim()}
                                    alt=""
                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                                />
                            )}
                            {index < rows.length && rows.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    aria-label="Odebrat obrázek"
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <p className={`text-[11px] font-bold pl-12 ${STATUS_CLASS[status]}`}>{STATUS_TEXT[status]}</p>
                    </div>
                );
            })}

            <p className="text-[11px] text-gray-400">
                První obrázek je hlavní - ukazuje se v přehledu. V detailu se obrázky přepínají šipkami a samy po 5 s.
            </p>
        </div>
    );
}
