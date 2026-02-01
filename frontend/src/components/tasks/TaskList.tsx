'use client';

import { Task } from '@/types';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    isLoading: boolean;
}

export default function TaskList({ tasks, onToggle, onDelete, isLoading }: TaskListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 glass-card animate-pulse rounded-[1.5rem]" />
                ))}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-white/5 rounded-[2rem] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 animate-scan" />

                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <span className="text-3xl grayscale opacity-50">🪐</span>
                </div>
                <h3 className="font-black text-white uppercase tracking-[0.2em] mb-2">Sector Clear</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px] mx-auto">
                    No active protocols detected. Maintaining orbit.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
