'use client';

import { cn } from '@/lib/utils';
import {
    Inbox,
    Calendar,
    Star,
    CheckCircle,
    Search,
    Settings,
    Plus,
    LayoutGrid,
    Hash,
    LogOut
} from 'lucide-react';
import { auth } from '@/lib/auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

interface SidebarProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

// EVE-Style Navigation Panel (Expanded)
export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
    const [user, setUser] = useState<{ name?: string, email: string, avatar_url?: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get('/users/me');
                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch user in sidebar', err);
            }
        };
        fetchUser();
    }, []);

    const categories = [
        { name: 'Inbox', icon: Inbox },
        { name: 'Today', icon: Calendar },
        { name: 'Important', icon: Star },
        { name: 'Completed', icon: CheckCircle },
    ];

    const projects = ['Work', 'Personal', 'Shopping', 'Ideas'];

    return (
        <aside className="w-64 h-screen bg-[#0A0A0B]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 z-50 shrink-0 relative overflow-hidden">
            {/* Ambient Sidebar Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none" />

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-12 h-12 bg-black/50 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                    {user?.avatar_url ? (
                        <img src={user.avatar_url} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-neon-green font-black">{user?.name?.[0] || 'U'}</div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate tracking-wide">{user?.name || 'Commander'}</p>
                    <p className="text-[10px] text-neon-green uppercase tracking-[0.2em] animate-pulse">Online</p>
                </div>
            </div>

            {/* Navigation (Scrollable) */}
            <nav className="flex-1 space-y-2 relative z-10 overflow-y-auto min-h-0 pr-2">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => onCategoryChange(cat.name)}
                        className={cn(
                            "flex items-center gap-4 w-full px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-transparent shrink-0",
                            activeCategory === cat.name
                                ? "bg-white/5 text-neon-green border-neon-green/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <cat.icon size={18} strokeWidth={2.5} />
                        {cat.name}
                    </button>
                ))}

                <div className="py-6 shrink-0">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="space-y-1">
                    <p className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 shrink-0">Projects</p>
                    {projects.map((project) => (
                        <button
                            key={project}
                            onClick={() => onCategoryChange(project)}
                            className={cn(
                                "flex items-center gap-4 w-full px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 group shrink-0",
                                activeCategory === project
                                    ? "text-hologram-blue bg-hologram-blue/5"
                                    : "text-gray-500 hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all group-hover:scale-150 group-hover:bg-hologram-blue",
                                activeCategory === project ? "bg-hologram-blue shadow-[0_0_10px_#00F0FF]" : "bg-gray-700"
                            )} />
                            {project}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Footer Actions (Pinned) */}
            <div className="pt-6 mt-auto space-y-2 relative z-20 shrink-0 border-t border-white/5">
                <Link href="/dashboard/settings" className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-xs font-bold text-gray-500 hover:text-hologram-blue hover:bg-white/5 transition-all uppercase tracking-widest">
                    <Settings size={18} />
                    System
                </Link>
                <button
                    onClick={() => auth.logout()}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-xs font-bold text-gray-500 hover:text-alert-red hover:bg-alert-red/10 transition-all uppercase tracking-widest group"
                >
                    <LogOut size={18} className="group-hover:animate-pulse" />
                    Disconnect
                </button>
            </div>
        </aside>
    );
}
