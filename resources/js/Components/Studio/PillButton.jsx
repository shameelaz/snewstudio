import { motion } from 'framer-motion';
import { ArrowUpRight, LoaderCircle } from '@/lib/icons';
import StudioLink from '@/Components/Studio/StudioLink';

const MotionStudioLink = motion.create(StudioLink);

const sizes = {
    md: 'min-h-12 gap-4 pl-6 pr-1.5 text-xs sm:text-sm',
    lg: 'min-h-14 gap-5 pl-7 pr-2 text-sm sm:min-h-16 sm:pl-9 sm:text-base',
};

/**
 * Rounded call-to-action with a gradient fill sweep and an arrow that swaps
 * out on hover. Renders an Inertia link when `href` is given, otherwise a
 * button. Pass `variants` to take part in a parent's staggered entrance.
 */
export default function PillButton({ href, size = 'md', busy = false, className = '', children, ...props }) {
    const Component = href ? MotionStudioLink : motion.button;

    return (
        <Component
            href={href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`group relative isolate inline-flex items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.04] font-medium uppercase tracking-[0.2em] text-snow transition-colors duration-500 hover:border-transparent hover:text-ink focus-visible:border-transparent focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink disabled:cursor-wait disabled:opacity-70 ${sizes[size]} ${className}`}
            {...props}
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-linear-to-r from-accent to-accent-2 transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="whitespace-nowrap">{children}</span>
            <span
                aria-hidden="true"
                className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-snow text-ink ${size === 'lg' ? 'size-10 sm:size-12' : 'size-9'}`}
            >
                {busy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                ) : (
                    <>
                        <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-[160%] group-hover:translate-x-[160%] sm:size-5" />
                        <ArrowUpRight className="absolute size-4 -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 sm:size-5" />
                    </>
                )}
            </span>
        </Component>
    );
}
