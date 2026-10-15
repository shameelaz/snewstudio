import { Head } from '@inertiajs/react';
import ContactSection from '@/Components/Studio/ContactSection';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <ContactSection />
        </>
    );
}

Contact.layout = (page) => <StudioLayout>{page}</StudioLayout>;
