'use client';

import Footer from '../footer';
import Nav from '../nav';
import Top from '../top';
import { useState, useEffect } from 'react';

interface Blog {
    id: number;
    image: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function fetchBlogs() {
        try {
            const res = await fetch('/api/blog');
            const data = await res.json();
            if (Array.isArray(data)) {
                setBlogs(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Top />
            <Nav />
            <main className='flex justify-center items-center w-full flex-col'>
                <div className="flex flex-col justify-center items-center w-full md:w-[60%] bg-white">
                    <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600'>Blog</h1>
                    
                    <div className='flex flex-col w-[95%] mb-12 gap-8'>
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white border border-gray-200 rounded-none flex flex-col w-full"
                            >
                                <div className="w-full">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-auto object-cover rounded-none"
                                        onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Bez+obrázku')}
                                    />
                                </div>
                                <div className="w-full p-6 flex flex-col">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-700 whitespace-pre-wrap mb-4">
                                        {blog.text}
                                    </p>
                                    <div className="text-sm text-gray-400 mt-auto pt-4 border-t border-gray-100">
                                        {new Date(blog.createdAt).toLocaleDateString('cs-CZ')}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {blogs.length === 0 && (
                            <div className="text-center text-gray-500 py-10 w-full">
                                Zatím zde nejsou žádné články.
                            </div>
                        )}
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
}