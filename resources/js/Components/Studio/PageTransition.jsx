import { motion } from 'framer-motion';
import { easeIn, easeOutExpo, useRise } from '@/lib/motion';

/** Wraps each page so AnimatePresence can fade it in and out between visits. */
export default function PageTransition({ children }) {
    const rise = useRise(16);

    return (
        <motion.div
            initial={{ opacity: 0, y: rise }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } }}
            exit={{ opacity: 0, y: -rise / 2, transition: { duration: 0.3, ease: easeIn } }}
        >
            {children}
        </motion.div>
    );
}
