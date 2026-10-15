import { useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

const pages = [
    '/',
    '/projects',
    '/career',
    '/certifications',
    '/education'
];

export default function MainLayout({ children }) {
    const { url } = usePage();
    const mainRef = useRef(null);
    const isNavigating = useRef(false);
    const touchStartY = useRef(0);
    
    const prevIndexRef = useRef(pages.indexOf(url));
    const slideDirRef = useRef('up');

    const currentIndex = pages.indexOf(url);
    if (currentIndex !== -1 && currentIndex !== prevIndexRef.current) {
        slideDirRef.current = currentIndex > prevIndexRef.current ? 'up' : 'down';
        prevIndexRef.current = currentIndex;
    }

    const navigateTo = (direction) => {
        if (isNavigating.current) return;

        if (currentIndex === -1) return;

        let targetUrl = null;

        if (direction === 'next' && currentIndex < pages.length - 1) {
            targetUrl = pages[currentIndex + 1];
        } else if (direction === 'prev' && currentIndex > 0) {
            targetUrl = pages[currentIndex - 1];
        }

        if (targetUrl) {
            isNavigating.current = true;
            router.visit(targetUrl, {
                preserveScroll: false,
                onFinish: () => {
                    setTimeout(() => {
                        isNavigating.current = false;
                    }, 800);
                }
            });
        }
    };

    const handleWheel = (e) => {
        const main = mainRef.current;
        if (!main) return;

        const isAtBottom = main.scrollHeight - main.scrollTop - main.clientHeight < 1;
        const isAtTop = main.scrollTop === 0;

        if (e.deltaY > 15 && isAtBottom) {
            navigateTo('next');
        } else if (e.deltaY < -15 && isAtTop) {
            navigateTo('prev');
        }
    };

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartY.current) return;
        
        const main = mainRef.current;
        if (!main) return;

        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        const isAtBottom = main.scrollHeight - main.scrollTop - main.clientHeight < 1;
        const isAtTop = main.scrollTop === 0;

        if (deltaY > 40 && isAtBottom) {
            navigateTo('next');
        } else if (deltaY < -40 && isAtTop) {
            navigateTo('prev');
        }
        
        touchStartY.current = 0;
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main 
                ref={mainRef}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="flex-1 p-8 md:p-12 lg:p-20 h-screen overflow-y-auto overflow-x-hidden"
            >
                <style>{`
                    @keyframes slideUp {
                        from { transform: translateY(60px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes slideDown {
                        from { transform: translateY(-60px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-slide-up {
                        animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .animate-slide-down {
                        animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
                <div key={url} className={`w-full min-h-full ${slideDirRef.current === 'up' ? 'animate-slide-up' : 'animate-slide-down'}`}>
                    {children}
                </div>
            </main>
        </div>
    );
}
