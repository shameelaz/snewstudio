import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck, RotateCcw } from 'lucide-react';
import { easeOutExpo } from '@/lib/motion';

/** Replaces a submitted form; focuses its heading so screen readers announce it. */
export default function FormSuccess({ title, message, actionLabel, onReset, children }) {
    const headingRef = useRef(null);

    useEffect(() => headingRef.current?.focus(), []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOutExpo } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            className="flex min-h-96 flex-col items-center justify-center py-10 text-center"
        >
            <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.1 } }}
                className="grid size-16 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent"
            >
                <CircleCheck aria-hidden="true" className="size-7" strokeWidth={1.75} />
            </motion.span>
            <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-2xl font-semibold tracking-tight text-snow outline-none sm:text-3xl">
                {title}
            </h2>
            <p className="mt-3 max-w-sm text-fog">{message}</p>
            {children}
            <button
                type="button"
                onClick={onReset}
                className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-medium text-fog transition-colors hover:border-white/25 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
                <RotateCcw aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:-rotate-180" />
                {actionLabel}
            </button>
        </motion.div>
    );
}
