import { Head } from '@inertiajs/react';
import PricingSection from '@/Components/Studio/PricingSection';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Pricing() {
    return (
        <>
            <Head title="Pricing" />
            <PricingSection />
        </>
    );
}

Pricing.layout = (page) => <StudioLayout>{page}</StudioLayout>;
