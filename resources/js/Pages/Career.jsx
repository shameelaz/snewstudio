import MainLayout from '@/Layouts/MainLayout';
import CareerItem from '@/Components/CareerItem';

export default function Career() {
  return (
    <div className="max-w-4xl w-full pb-16">
      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">CAREER</p>

        <h2 className="text-text-heading text-3xl font-bold mb-4 tracking-tight">
          A few chapters of my journey so far.
        </h2>
        <p className="text-[#9ba1b0] mb-12 max-w-2xl leading-relaxed">
          Different companies, different products, same curiosity to make things look right and work right.
        </p>

        <div className="space-y-12 border-l-2 border-[#2a2b36] pl-8 ml-2">
          <CareerItem
            date="April 2022 - Present"
            role="Programmer"
            company="3F Resources Sdn Bhd"
            link="#"
            description="Improved system performance by developing and maintaining Laravel + ReactJS applications. Delivered multiple projects under tight deadlines, ensuring accurate requirement implementation. Supported UAT, FAT, PAT, and deployment activities for stable and optimized operations."
          />
          <CareerItem
            date="Feb 2021 - March 2022"
            role="Software Developer"
            company="Fiscal Digest Sdn Bhd"
            link="#"
            description="Developed and maintained Laravel + ArcGIS applications to increase user engagement. Gathered requirements with cross-functional teams, implemented new features, and resolved software defects efficiently to enhance system functionality and stability."
          />
          <CareerItem
            date="Aug 2020 - Jan 2021"
            role="Junior Developer (Intern)"
            company="Xentral Methods Sdn Bhd"
            link="#"
            description="Improved UI quality by designing website layouts and interfaces. Supported project delivery via Agile workflows and enhanced front-end performance by developing interfaces with HTML, CSS, and JavaScript."
          />
        </div>
      </div>
    </div>
  );
}

Career.layout = page => <MainLayout>{page}</MainLayout>;
