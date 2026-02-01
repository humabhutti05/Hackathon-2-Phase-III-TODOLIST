'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import apiClient from '@/lib/api-client';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Camera, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleNavigation = (category: string) => {
        // Since dashboard uses local state for categories, we just route back to root
        // In a real app we might pass ?category=foo query param
        router.push('/dashboard');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get<User>('/users/me');
                setUser(response.data);
                setName(response.data.name || '');
                setEmail(response.data.email);
                // @ts-ignore - avatar_url might not be in base User type yet
                setAvatarUrl(response.data.avatar_url || '');
            } catch (err) {
                console.error('Failed to fetch user', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const response = await apiClient.patch<User>('/users/me', {
                name,
                email,
                avatar_url: avatarUrl
            });
            setUser(response.data);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-white/10 border-t-neon-green rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-transparent">
            {/* Background handled by globals.css */}
            <Sidebar activeCategory="Settings" onCategoryChange={handleNavigation} />

            <main className="flex-1 overflow-y-auto px-8 py-12 md:px-20 md:py-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-3xl"
                >
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-neon-green transition mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Command
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl font-black text-white tracking-[0.2em] uppercase mb-2">System Config</h1>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Manage User Credentials</p>
                    </header>

                    <form onSubmit={handleSave} className="space-y-8">
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${message.type === 'success'
                                    ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green'
                                    : 'bg-alert-red/10 border border-alert-red/30 text-alert-red'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full animate-pulse ${message.type === 'success' ? 'bg-neon-green' : 'bg-alert-red'
                                    }`} />
                                {message.text}
                            </motion.div>
                        )}

                        <section className="glass-panel p-8 rounded-[2rem] space-y-8 relative overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

                            {/* Avatar Section */}
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="relative group">
                                    <div className="w-32 h-32 bg-black/50 rounded-full border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:border-neon-green/50 transition-colors">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon size={48} className="text-gray-600" />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <button type="button" className="absolute bottom-0 right-0 p-3 bg-neon-green text-black rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg uppercase tracking-wider">Holotag</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Upload encrypted image data (Max 2MB).</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-hologram-blue ml-1 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-hologram-blue rounded-full" /> Display Name
                                    </label>
                                    <div className="relative group">
                                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-green transition-colors" size={18} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full sci-fi-input rounded-xl py-4 pl-12 pr-4 text-sm font-bold tracking-wide"
                                            placeholder="OPERATOR NAME"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-hologram-blue ml-1 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-hologram-blue rounded-full" /> Transmission ID
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-green transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full sci-fi-input rounded-xl py-4 pl-12 pr-4 text-sm font-bold tracking-wide"
                                            placeholder="EMAIL ADDRESS"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-hologram-blue ml-1 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-hologram-blue rounded-full" /> Holotag Source
                                    </label>
                                    <input
                                        type="text"
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        className="w-full sci-fi-input rounded-xl py-4 px-6 text-sm font-bold tracking-wide text-gray-400"
                                        placeholder="https://image-source.com/avatar.png"
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="neon-button px-12 py-4 rounded-xl text-xs flex items-center gap-3 disabled:opacity-50"
                            >
                                <Save size={18} />
                                {isSaving ? 'Synchronizing...' : 'Commit Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
