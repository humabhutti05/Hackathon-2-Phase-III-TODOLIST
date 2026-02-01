'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task } from '@/types';
import apiClient from '@/lib/api-client';
import TaskList from '@/components/tasks/TaskList';
import CreateTask from '@/components/tasks/CreateTask';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Inbox');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            const response = await apiClient.get<Task[]>('/tasks/');
            setTasks(response.data.reverse()); // Newest first
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreate = async (data: { title: string; description?: string; priority: string; category: string; due_date?: string }) => {
        const response = await apiClient.post<Task>('/tasks/', data);
        setTasks(prev => [response.data, ...prev]);
    };

    const handleToggle = async (id: number, is_completed: boolean) => {
        const response = await apiClient.patch<Task>(`/tasks/${id}`, { is_completed });
        setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    };

    const handleDelete = async (id: number) => {
        await apiClient.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    // Filtering Logic
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            // Category filter
            let matchesCategory = true;
            if (activeCategory === 'Important') matchesCategory = task.priority === 'High';
            else if (activeCategory === 'Completed') matchesCategory = task.is_completed;
            else if (activeCategory !== 'Inbox' && activeCategory !== 'Today') {
                matchesCategory = task.category === activeCategory;
            }

            // Filter out completed from other views unless it's the 'Completed' view
            if (activeCategory !== 'Completed' && task.is_completed) return false;

            // Search filter
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

            return matchesCategory && matchesSearch;
        });
    }, [tasks, activeCategory, searchQuery]);

    const stats = useMemo(() => ({
        total: tasks.length,
        completed: tasks.filter(t => t.is_completed).length,
        pending: tasks.filter(t => !t.is_completed).length
    }), [tasks]);

    return (
        <div className="flex h-screen overflow-hidden bg-transparent">
            {/* Background handled in global CSS */}
            <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            <main className="flex-1 overflow-y-auto px-8 py-12 md:px-20 md:py-20 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="max-w-3xl mx-auto"
                >
                    <motion.header
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="mb-12 flex items-end justify-between"
                    >
                        <div>
                            <p className="text-xs font-black text-neon-green uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                                {activeCategory === 'Inbox' ? 'System Status' : 'Sector View'}
                            </p>
                            <h1 className="text-5xl font-black text-white tracking-tighter uppercase glitch-text" data-text={activeCategory}>{activeCategory}</h1>
                        </div>
                        <div className="flex gap-8 text-right">
                            <div className="flex flex-col items-end">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Active Protocols</p>
                                <p className="text-2xl font-black text-hologram-blue leading-none tracking-widest">{stats.pending.toString().padStart(2, '0')}</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="flex flex-col items-end">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Archived</p>
                                <p className="text-2xl font-black text-white/30 leading-none tracking-widest">{stats.completed.toString().padStart(2, '0')}</p>
                            </div>
                        </div>
                    </motion.header>

                    <motion.section
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="space-y-8"
                    >
                        <CreateTask onCreate={handleCreate} />

                        <div className="glass-panel rounded-[2rem] p-8 relative overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

                            <div className="relative z-10 space-y-8">
                                {/* System Status Bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <span>System Load</span>
                                        <span className="text-neon-green">{Math.round((stats.completed / (stats.total || 1)) * 100)}% Efficiency</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-neon-green shadow-[0_0_10px_#39FF14]"
                                            style={{ width: `${(stats.completed / (stats.total || 1)) * 100}%` }}
                                        />
                                        <div
                                            className="h-full bg-hologram-blue shadow-[0_0_10px_#00F0FF]"
                                            style={{ width: `${(stats.pending / (stats.total || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                        <span className="w-2 h-2 bg-neon-green rounded-sm shadow-[0_0_10px_#39FF14]" />
                                        Protocol List
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                        {filteredTasks.length} Active
                                    </span>
                                </div>
                                <TaskList
                                    tasks={filteredTasks}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    </motion.section>
                </motion.div>
            </main>
        </div>
    );
}
