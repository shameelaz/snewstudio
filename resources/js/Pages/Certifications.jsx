import MainLayout from '@/Layouts/MainLayout';
import CareerItem from '@/Components/CareerItem';

export default function Certifications() {
  return (
    <div className="max-w-4xl w-full pb-16">
      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">CERTIFICATIONS</p>
        <h2 className="text-text-heading text-3xl font-bold mb-8 tracking-tight">
          Professional <br /> Credentials.
        </h2>
        <div className="space-y-8 border-l-2 border-[#2a2b36] pl-8 ml-2">
          <CareerItem
            date="2024"
            role="Certified Kubernetes Administrator (CKA)"
            company="The Linux Foundation"
            link="#"
            description="Demonstrated expertise in designing, building, configuring, and exposing cloud native applications for Kubernetes."
          />
          <CareerItem
            date="2024"
            role="Certified DevOps Foundation"
            company="CCSD Council"
            link="#"
            description="Validated foundational knowledge of DevOps principles, practices, and tooling."
          />
        </div>
      </div>
    </div>
  );
}

Certifications.layout = page => <MainLayout>{page}</MainLayout>;
