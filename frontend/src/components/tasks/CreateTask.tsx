'use client';

import { useState } from 'react';
import { Plus, Hash, Flag, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface CreateTaskProps {
    onCreate: (data: { title: string; description?: string; priority: string; category: string; due_date?: string }) => Promise<void>;
}

export default function CreateTask({ onCreate }: CreateTaskProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Inbox');
    const [dueDate, setDueDate] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await onCreate({
                title,
                description,
                priority,
                category,
                due_date: dueDate || undefined
            });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setDueDate('');
            setIsExpanded(false);
        } catch (err) {
            console.error('Failed to create task', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const priorityColors: Record<string, string> = {
        Low: 'text-hologram-blue border-hologram-blue/30',
        Medium: 'text-[#FFD700] border-[#FFD700]/30', // Gold for Mid
        High: 'text-alert-red border-alert-red/30',
    };

    return (
        <div className="relative">
            <motion.div
                layout
                className="glass-panel rounded-[1.5rem] overflow-hidden backdrop-blur-3xl"
            >
                {!isExpanded ? (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="flex items-center gap-4 w-full p-5 text-gray-400 hover:text-white transition group"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <Plus size={24} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-lg tracking-tight uppercase">Initiate Protocol...</span>
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                        <input
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Protocol Identifier"
                            className="w-full text-2xl font-black border-none focus:ring-0 p-0 text-white placeholder:text-white/20 bg-transparent"
                            disabled={isSubmitting}
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add command parameters..."
                            className="w-full text-sm border-none focus:ring-0 p-0 text-gray-400 placeholder:text-white/10 mt-4 resize-none h-20 bg-transparent font-medium"
                            disabled={isSubmitting}
                        />

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                            <div className="flex gap-4 items-center">
                                {/* Priority Selector - Sci-Fi Style */}
                                <div className="flex items-center gap-1 group/btn relative">
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    >
                                        <option value="Low">Low Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="High">High Priority</option>
                                    </select>
                                    <button type="button" className={cn("px-3 py-2 rounded-lg transition-all border flex items-center gap-2 bg-black/40", priorityColors[priority])}>
                                        <Flag size={14} fill="currentColor" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{priority}</span>
                                    </button>
                                </div>

                                {/* Date Selector */}
                                <div className="flex items-center gap-1 relative">
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <button type="button" className={cn("px-3 py-2 rounded-lg transition-all border flex items-center gap-2", dueDate ? "text-hologram-blue bg-hologram-blue/10 border-hologram-blue/30" : "text-gray-500 bg-black/40 border-white/5 hover:text-white")}>
                                        <Calendar size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{dueDate ? format(new Date(dueDate), 'MMM d') : 'Deadline'}</span>
                                    </button>
                                </div>

                                {/* Category Selector */}
                                <div className="flex items-center gap-1 relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    >
                                        <option value="Inbox">Inbox</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Shopping">Shopping</option>
                                    </select>
                                    <button type="button" className="px-3 py-2 text-gray-500 bg-black/40 border border-white/5 rounded-lg transition-all hover:text-white flex items-center gap-2">
                                        <Hash size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(false)}
                                    className="px-6 py-2 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition"
                                    disabled={isSubmitting}
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={!title.trim() || isSubmitting}
                                    className="px-8 py-3 text-xs font-black text-black bg-neon-green hover:bg-[#32E612] rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                                >
                                    {isSubmitting ? 'Processing...' : 'Engage'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
