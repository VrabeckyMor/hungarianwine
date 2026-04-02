import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const blog = await prisma.blog.create({ data });
        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error("Failed to create blog:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, createdAt, updatedAt, ...updateData } = data;

        if (!id) {
            return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
        }

        const blog = await prisma.blog.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
        return NextResponse.json(blog);
    } catch (error) {
        console.error("Failed to update blog:", error);
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

        await prisma.blog.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
