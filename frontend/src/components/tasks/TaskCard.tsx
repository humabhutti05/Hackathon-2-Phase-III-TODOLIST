'use client';

import { Task } from '@/types';
import { Check, Trash2, Calendar, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
    const getPriorityVariant = (p: string) => {
        switch (p.toLowerCase()) {
            case 'high': return 'high';
            case 'medium': return 'medium';
            case 'low': return 'low';
            default: return 'default';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            className="group glass-card p-5 rounded-[1.5rem] relative overflow-hidden"
        >
            {/* Decorative Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent -mr-8 -mt-8 rotate-45 pointer-events-none" />

            <div className="flex items-start gap-4">
                {/* Sci-Fi Checkbox */}
                <button
                    onClick={() => onToggle(task.id, !task.is_completed)}
                    className={cn(
                        "mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 shrink-0",
                        task.is_completed
                            ? "bg-neon-green border-neon-green text-black shadow-[0_0_10px_rgba(57,255,20,0.4)]"
                            : "border-white/20 bg-black/40 hover:border-neon-green/50"
                    )}
                >
                    {task.is_completed && <Check size={12} strokeWidth={4} />}
                </button>

                <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className={cn(
                            "font-bold text-lg text-white transition-all duration-300 truncate tracking-tight",
                            task.is_completed && "line-through text-gray-500"
                        )}>
                            {task.title}
                        </h3>
                        <Badge variant={getPriorityVariant(task.priority)}>
                            {task.priority}
                        </Badge>
                    </div>

                    {task.description && (
                        <p className={cn(
                            "text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed max-w-[90%]",
                            task.is_completed && "opacity-30"
                        )}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-[9px] font-black text-gray-500 uppercase tracking-[0.1em]">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                            <Calendar size={10} className="text-hologram-blue" />
                            <span className="text-gray-300">{task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : 'NO DATE'}</span>
                        </div>
                        <div className="w-1 h-3 bg-white/10" />
                        <div className="text-hologram-blue">{task.category}</div>
                    </div>
                </div>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4">
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-gray-500 hover:text-alert-red hover:bg-alert-red/10 rounded-lg transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
