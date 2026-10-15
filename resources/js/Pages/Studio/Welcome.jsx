import { Head } from '@inertiajs/react';
import WelcomeScreen from '@/Components/Studio/WelcomeScreen';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <WelcomeScreen />
        </>
    );
}

Welcome.layout = (page) => <StudioLayout>{page}</StudioLayout>;
