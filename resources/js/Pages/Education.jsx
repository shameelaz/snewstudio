import MainLayout from '@/Layouts/MainLayout';
import CareerItem from '@/Components/CareerItem';

export default function Education() {
  return (
    <div className="max-w-4xl w-full pb-16">
      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">EDUCATION</p>
        <h2 className="text-text-heading text-3xl font-bold mb-8 tracking-tight">
          Academic <br /> Background.
        </h2>
        <div className="space-y-8 border-l-2 border-[#2a2b36] pl-8 ml-2">
          <CareerItem
            date="2018 - 2020"
            role="Bachelor of Computer Forensic (Hons)"
            company="Management & Science University"
            link="#"
            description="Graduated with honors, focusing on computing foundations and forensic technologies."
          />
          <CareerItem
            date="2015 - 2017"
            role="Diploma in Programming"
            company="Politeknik Sultan Idris Shah"
            link="#"
            description="Developed strong fundamentals in programming, software engineering, and database management."
          />
        </div>
      </div>
    </div>
  );
}

Education.layout = page => <MainLayout>{page}</MainLayout>;
