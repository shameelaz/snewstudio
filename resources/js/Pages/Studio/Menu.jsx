import { Head } from '@inertiajs/react';
import MainMenu from '@/Components/Studio/MainMenu';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Menu() {
    return (
        <>
            <Head title="Menu" />
            <MainMenu />
        </>
    );
}

Menu.layout = (page) => <StudioLayout>{page}</StudioLayout>;
