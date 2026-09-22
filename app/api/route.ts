import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Produkt drží seznam obrázků v `images`; `image` zůstává hlavní (první) obrázek
// kvůli starším záznamům a místům, která čekají jediný řetězec.
function normalizeImages<T extends Record<string, unknown>>(data: T) {
    const raw = Array.isArray(data.images) ? (data.images as unknown[]) : [];
    const images = raw
        .filter((url): url is string => typeof url === "string")
        .map((url) => url.trim())
        .filter(Boolean);

    if (images.length === 0 && typeof data.image === "string" && data.image.trim()) {
        images.push(data.image.trim());
    }

    return { ...data, images, image: images[0] ?? "" };
}

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = normalizeImages(await request.json());
        console.log("Attempting to create product with data:", JSON.stringify(data, null, 2));
        const product = await prisma.product.create({ data });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Failed to create product. Prisma Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, createdAt, updatedAt, ...rest } = data;
        const updateData = normalizeImages(rest);

        if (!id) {
            return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error("Failed to update product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required for deletion" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Failed to delete product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
