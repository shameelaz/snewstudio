import { Head } from '@inertiajs/react';
import FeedbackSection from '@/Components/Studio/FeedbackSection';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Feedback() {
    return (
        <>
            <Head title="Feedback" />
            <FeedbackSection />
        </>
    );
}

Feedback.layout = (page) => <StudioLayout>{page}</StudioLayout>;
