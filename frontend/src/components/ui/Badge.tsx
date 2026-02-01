import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'high' | 'medium' | 'low' | 'outline';
    className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-white/5 border-white/5 text-gray-400',
        high: 'bg-alert-red/10 border-alert-red/30 text-alert-red shadow-[0_0_10px_rgba(255,42,109,0.2)]',
        medium: 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]',
        low: 'bg-hologram-blue/10 border-hologram-blue/30 text-hologram-blue',
        outline: 'bg-transparent border-white/20 text-gray-300',
    };

    return (
        <span className={cn(
            'px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border transition-all duration-300',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
