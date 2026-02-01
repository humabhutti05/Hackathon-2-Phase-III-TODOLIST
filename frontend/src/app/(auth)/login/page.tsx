'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Zap } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (auth.isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            await auth.login(data.email, data.password);
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Authentication failed. Please verify your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
            {/* Ambient Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[100px] -z-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-black/50 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(57,255,20,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap className="text-neon-green fill-neon-green/20" size={36} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-[0.2em] mb-2 uppercase">System Login</h1>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em]">Secure Terminal Access</p>
                </div>

                <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden">
                    {/* Scanning Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/50 to-transparent opacity-30 animate-[scan_3s_linear_infinite]" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-alert-red/10 border border-alert-red/30 text-alert-red px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 bg-alert-red rounded-full animate-ping" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Identity</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-green transition-colors" size={16} />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full sci-fi-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold placeholder:text-gray-700"
                                    placeholder="OPERATOR ID"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[10px] font-bold text-alert-red ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-green transition-colors" size={16} />
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full sci-fi-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold placeholder:text-gray-700"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-[10px] font-bold text-alert-red ml-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full neon-button py-4 rounded-xl text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? 'Decrypting...' : (
                                <>
                                    Establish Link <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    No Clearance?{' '}
                    <Link href="/signup" className="text-neon-green hover:underline hover:text-[#32E612] transition-colors">
                        Request Access
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
