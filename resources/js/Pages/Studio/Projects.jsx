import { Head } from '@inertiajs/react';
import ProjectsSection from '@/Components/Studio/ProjectsSection';
import StudioLayout from '@/Layouts/StudioLayout';

export default function Projects() {
    return (
        <>
            <Head title="Projects" />
            <ProjectsSection />
        </>
    );
}

Projects.layout = (page) => <StudioLayout>{page}</StudioLayout>;
