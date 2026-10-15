import { Head } from '@inertiajs/react';
import PortfolioSection from '@/Components/Studio/PortfolioSection';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Portfolio() {
    return (
        <>
            <Head title="Portfolio" />
            <PortfolioSection />
        </>
    );
}

Portfolio.layout = (page) => <StudioLayout>{page}</StudioLayout>;
