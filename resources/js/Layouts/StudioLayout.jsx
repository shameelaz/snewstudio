import { usePage } from '@inertiajs/react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import AnimatedBackground from '@/Components/Studio/AnimatedBackground';
import PageTransition from '@/Components/Studio/PageTransition';
import StudioHeader from '@/Components/Studio/StudioHeader';

/**
 * Persistent layout for the public site. Pages opt in with
 * `Page.layout = (page) => <StudioLayout>{page}</StudioLayout>`, which keeps
 * the background and header mounted while pages transition between visits.
 */
export default function StudioLayout({ children }) {
    const { url } = usePage();
    const path = url.split(/[?#]/)[0];
    const isWelcome = path === '/';

    return (
        <MotionConfig reducedMotion="user">
            <div className="relative min-h-dvh overflow-x-clip bg-ink font-sans text-fog antialiased">
                <AnimatedBackground calm={!isWelcome} />

                <a
                    href="#content"
                    className="sr-only z-50 rounded-full bg-snow px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
                >
                    Skip to content
                </a>

                <AnimatePresence>{!isWelcome && <StudioHeader key="header" path={path} />}</AnimatePresence>

                <main id="content" className="relative z-10">
                    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                        <PageTransition key={path}>{children}</PageTransition>
                    </AnimatePresence>
                </main>
            </div>
        </MotionConfig>
    );
}
