// Produkt má seznam obrázků v `images`. Starší záznamy mají jen `image`,
// proto se na něj padá zpátky, aby nikde nezmizel obrázek.
export interface WithImages {
    image?: string | null;
    images?: string[] | null;
}

export function productImages(product: WithImages): string[] {
    const list = (product.images ?? []).map((url) => url?.trim()).filter((url): url is string => !!url);
    if (list.length > 0) return list;
    const single = product.image?.trim();
    return single ? [single] : [];
}
