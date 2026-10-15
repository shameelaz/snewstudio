import MainLayout from '@/Layouts/MainLayout';
import CareerItem from '@/Components/CareerItem';

export default function Projects() {
  return (
    <div className="max-w-4xl w-full pb-16">
      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 mb-8 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">PROJECTS</p>

        <h2 className="text-text-heading text-3xl font-bold mb-4 tracking-tight">
          Systems & Applications Built
        </h2>
        <p className="text-[#9ba1b0] mb-12 max-w-2xl leading-relaxed">
          A selection of projects I've delivered over the years.
        </p>

        <div className="space-y-12 border-l-2 border-[#2a2b36] pl-8 ml-2">
          <CareerItem
            date="Early 2025"
            role="Sistem Pengurusan Biasiswa & Bantuan Kewangan (KPM)"
            company="3F Resources Sdn Bhd"
            link="#"
            description="Built a full scholarship management system using Laravel + ReactJS to streamline application and approval workflows. Participated in UAT/FAT/PAT and deployment to ensure smooth rollout."
          />
          <CareerItem
            date="Early 2024"
            role="ePay (Perak)"
            company="3F Resources Sdn Bhd"
            link="#"
            description="Developed a secure online payment system with payment gateway integration using Laravel. Supported requirement analysis, testing cycles, and deployment activities."
          />
          <CareerItem
            date="Mid-2023"
            role="PerakGIS (Perak)"
            company="3F Resources Sdn Bhd"
            link="#"
            description="Created a GIS-based interactive map system using Laravel + ArcGIS for spatial data visualization. Contributed to requirement validation, testing phases, and deployment."
          />
          <CareerItem
            date="Late 2022"
            role="eLesen (PPJ)"
            company="3F Resources Sdn Bhd"
            link="#"
            description="Improved and maintained a Laravel-based licensing system, enhancing performance and compliance."
          />
          <CareerItem
            date="Mid-2022"
            role="MYRELA"
            company="Fiscal Digest Sdn Bhd"
            link="#"
            description="Built and deployed a web-based volunteer management system using Laravel to streamline volunteer registration and activities."
          />
          <CareerItem
            date="End-2021"
            role="SPPI V2 (LLM)"
            company="Fiscal Digest Sdn Bhd"
            link="#"
            description="Improved and maintained the Laravel-based licensing system for LLM to enhance performance and ensure regulatory compliance."
          />
        </div>
      </div>
    </div>
  );
}


Projects.layout = page => <MainLayout>{page}</MainLayout>;
