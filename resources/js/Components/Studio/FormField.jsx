import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert } from 'lucide-react';

export const fieldLabel = 'mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-fog';

/** Labelled input or textarea with an animated validation message. */
export default function FormField({ id, label, error, optional = false, as: Control = 'input', className = '', ...props }) {
    return (
        <div className={className}>
            <label htmlFor={id} className={fieldLabel}>
                {label}
                {optional && <span className="normal-case tracking-normal text-fog/60">Optional</span>}
            </label>
            <Control
                id={id}
                name={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`block w-full rounded-2xl border bg-white/[0.03] px-4 py-3.5 text-base text-snow outline-none transition duration-300 placeholder:text-fog/40 focus:border-accent/70 focus:bg-white/[0.05] focus:ring-4 focus:ring-accent/10 ${error ? 'border-rose-400/60' : 'border-white/10 hover:border-white/20'} ${Control === 'textarea' ? 'min-h-40 resize-y' : ''}`}
                {...props}
            />
            <AnimatePresence initial={false}>
                {error && (
                    <motion.p
                        id={`${id}-error`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 flex items-center gap-1.5 text-sm text-rose-300"
                    >
                        <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
