'use client';

import { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: 'wine' | 'other';
    color?: 'red' | 'pink' | 'white' | 'none' | null;
    sweetness?: 'sweet' | 'medium' | 'mediumdry' | 'dry' | null;
    region?: string | null;
    country?: string | null;
    alcohol?: number | null;
    volume?: number | null;
    image: string;
    description: string;
}

interface Blog {
    id: number;
    title: string;
    text: string;
    image: string;
    createdAt: string;
}

const initialFormData = {
    name: '',
    price: '',
    category: 'wine' as 'wine' | 'other',
    color: 'none' as 'red' | 'pink' | 'white' | 'none',
    sweetness: 'dry' as 'sweet' | 'medium' | 'mediumdry' | 'dry',
    region: '',
    country: '',
    alcohol: '',
    volume: '',
    image: '',
    description: '',
};

const initialBlogData = {
    title: '',
    image: '',
    text: '',
};

export default function Admin() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'products' | 'blogs'>('products');

    const [products, setProducts] = useState<Product[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [formData, setFormData] = useState(initialFormData);
    const [blogData, setBlogData] = useState(initialBlogData);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [authorized, setAuthorized] = useState(false);

    const fetchData = async () => {
        try {
            const pRes = await fetch('../api');
            const pData = await pRes.json();
            if (Array.isArray(pData)) setProducts(pData);

            const bRes = await fetch('/api/blog');
            const bData = await bRes.json();
            if (Array.isArray(bData)) setBlogs(bData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const checkAuth = async () => {
        const password = prompt('Zadejte administrátorské heslo:');
        if (!password) {
            window.location.href = '/';
            return;
        }

        try {
            const res = await fetch('/api/auth/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setAuthorized(true);
            } else {
                alert('Nesprávné heslo');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/';
        }
    };

    useEffect(() => {
        setMounted(true);
        checkAuth();
        fetchData();
    }, []);

    if (!mounted || !authorized) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (activeTab === 'products') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setBlogData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                alcohol: formData.alcohol ? parseFloat(formData.alcohol) : null,
                volume: formData.volume ? parseFloat(formData.volume) : null,
                color: formData.color === 'none' ? null : formData.color,
                sweetness: formData.sweetness || null,
                region: formData.region || null,
                country: formData.country || null,
                ...(editingId && { id: editingId.toString() })
            };

            const method = editingId ? 'PUT' : 'POST';
            const res = await fetch('../api', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage({
                    text: editingId ? 'Produkt úspěšně upraven!' : 'Produkt úspěšně přidán!',
                    type: 'success'
                });
                resetForm();
                fetchData();
            } else {
                const err = await res.json();
                setMessage({ text: `Chyba: ${err.error || 'Neznámá chyba'}`, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Chyba při komunikaci se serverem', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const payload = {
                ...blogData,
                ...(editingBlogId && { id: editingBlogId.toString() })
            };

            const method = editingBlogId ? 'PUT' : 'POST';
            const res = await fetch('/api/blog', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage({
                    text: editingBlogId ? 'Článek upraven!' : 'Článek přidán!',
                    type: 'success'
                });
                resetForm();
                fetchData();
            } else {
                const err = await res.json();
                setMessage({ text: `Chyba: ${err.error || 'Neznámá chyba'}`, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Chyba při komunikaci se serverem', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleEditProduct = (product: Product) => {
        setActiveTab('products');
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            color: product.color || 'none',
            sweetness: product.sweetness || 'dry',
            region: product.region || '',
            country: product.country || '',
            alcohol: product.alcohol?.toString() || '',
            volume: product.volume?.toString() || '',
            image: product.image,
            description: product.description,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditBlog = (blog: Blog) => {
        setActiveTab('blogs');
        setEditingBlogId(blog.id);
        setBlogData({
            title: blog.title,
            image: blog.image,
            text: blog.text,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Opravdu chcete tento produkt smazat?')) return;
        try {
            const res = await fetch(`../api?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
                if (editingId === id) resetForm();
            }
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleDeleteBlog = async (id: number) => {
        if (!confirm('Opravdu chcete tento článek smazat?')) return;
        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
                if (editingBlogId === id) resetForm();
            }
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setEditingId(null);
        setBlogData(initialBlogData);
        setEditingBlogId(null);
        setMessage({ text: '', type: '' });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">Administrace Odkapů</h1>
                        <p className="text-gray-500 mt-1">Správa produktů a blogu</p>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button 
                            onClick={() => { setActiveTab('products'); resetForm(); }}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'products' ? 'bg-white shadow text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Produkty
                        </button>
                        <button 
                            onClick={() => { setActiveTab('blogs'); resetForm(); }}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'blogs' ? 'bg-white shadow text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Články na Blog
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        {activeTab === 'products' ? (
                            <form onSubmit={handleProductSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 sticky top-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                                    {editingId ? 'Upravit Produkt' : 'Nový Produkt'}
                                </h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <input required name="name" type="text" placeholder="Název produktu *" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                                        <input required name="price" type="number" step="0.01" placeholder="Cena (Kč) *" value={formData.price} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                                        <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                                            <option value="wine">Víno</option>
                                            <option value="other">Ostatní</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select name="color" value={formData.color} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                                            <option value="none">Žádná</option><option value="red">Červené</option><option value="pink">Růžové</option><option value="white">Bílé</option>
                                        </select>
                                        <select name="sweetness" value={formData.sweetness} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
                                            <option value="dry">Suché</option><option value="mediumdry">Polosuché</option><option value="medium">Polosladké</option><option value="sweet">Sladké</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input name="region" type="text" placeholder="Region" value={formData.region} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                        <input name="country" type="text" placeholder="Země" value={formData.country} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input name="alcohol" type="number" step="0.1" placeholder="Alkohol %" value={formData.alcohol} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                        <input name="volume" type="number" step="0.01" placeholder="Objem (l)" value={formData.volume} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    </div>
                                    <input required name="image" type="text" placeholder="URL obrázku *" value={formData.image} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                    <textarea required name="description" rows={3} placeholder="Popis vína *" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none" />
                                </div>
                                <div className="mt-6 flex flex-col gap-2">
                                    <button disabled={loading} type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                                        {loading ? 'Pracuji...' : editingId ? 'Uložit změny' : 'Přidat produkt'}
                                    </button>
                                    {editingId && <button type="button" onClick={resetForm} className="text-gray-500 py-2">Zrušit úpravy</button>}
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleBlogSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 sticky top-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                                    {editingBlogId ? 'Upravit Článek' : 'Nový Článek'}
                                </h2>

                                <div className="space-y-4">
                                    <input required name="title" type="text" placeholder="Nadpis *" value={blogData.title} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                    <input required name="image" type="text" placeholder="URL obrázku *" value={blogData.image} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                    <textarea required name="text" rows={8} placeholder="Obsah článku *" value={blogData.text} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                                </div>
                                <div className="mt-6 flex flex-col gap-2">
                                    <button disabled={loading} type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                        {loading ? 'Pracuji...' : editingBlogId ? 'Uložit změny' : 'Přidat článek'}
                                    </button>
                                    {editingBlogId && <button type="button" onClick={resetForm} className="text-gray-500 py-2">Zrušit úpravy</button>}
                                </div>
                            </form>
                        )}
                        
                        {message.text && (
                            <div className={`mt-4 p-4 rounded-xl text-center text-sm font-bold border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-50 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {activeTab === 'products' ? 'Aktuální Nabídka' : 'Poslední Články'}
                                </h2>
                                <span className={`text-xs font-bold px-2 py-1 rounded tracking-widest ${activeTab === 'products' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'}`}>
                                    {activeTab === 'products' ? products.length : blogs.length} POLOŽEK
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{activeTab === 'products' ? 'Produkt' : 'Článek'}</th>
                                            {activeTab === 'products' && <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Parametry</th>}
                                            {activeTab === 'products' && <th className="py-4 px-6 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Cena</th>}
                                            <th className="py-4 px-6 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Akce</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {activeTab === 'products' ? (
                                            products.length > 0 ? products.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Wine')} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                                                                <p className="text-[10px] text-gray-400 max-w-[120px] truncate">{p.category}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-[11px] text-gray-600">{p.region || 'Neznámý region'}</span>
                                                            <span className="text-[10px] text-gray-400">{p.alcohol}% alc | {p.volume}l</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <p className="font-extrabold text-emerald-800 text-sm">{p.price} Kč</p>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex justify-center gap-2">
                                                            <button onClick={() => handleEditProduct(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 2 0 00-1-1h-4a1 2 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={4} className="py-12 text-center text-gray-400 italic">Zatím žádné produkty</td></tr>
                                            )
                                        ) : (
                                            blogs.length > 0 ? blogs.map((b) => (
                                                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                                                                <img src={b.image} alt={b.title} className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=No+Image')} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm max-w-[200px] truncate">{b.title}</p>
                                                                <p className="text-[10px] text-gray-400">{new Date(b.createdAt).toLocaleDateString('cs-CZ')}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex justify-center gap-2">
                                                            <button onClick={() => handleEditBlog(b)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                            </button>
                                                            <button onClick={() => handleDeleteBlog(b.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 2 0 00-1-1h-4a1 2 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={2} className="py-12 text-center text-gray-400 italic">Zatím žádné články na blogu</td></tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}