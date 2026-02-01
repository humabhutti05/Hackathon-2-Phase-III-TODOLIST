'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication on mount
        if (!auth.isAuthenticated()) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black/80 backdrop-blur-sm relative z-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/10 border-t-neon-green rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(57,255,20,0.3)]"></div>
                    <p className="mt-6 text-neon-green font-black text-xs uppercase tracking-[0.3em] city-scan-text">Initializing...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent relative">
            {/* Scanline Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[url('/scanlines.png')] opacity-[0.03] z-[9999]" />
            {children}
        </div>
    );
}
