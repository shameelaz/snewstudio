import MainLayout from '@/Layouts/MainLayout';

export default function About() {
  return (
    <div className="max-w-4xl w-full pb-16">
      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 mb-8 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">ABOUT ME</p>

        <h1 className="text-text-heading text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
          Hi, I'm Shameel Azhar.
        </h1>
        <p className="text-xl text-[#b0b0bc] mb-10">and this is about me!</p>

        <div className="space-y-6 text-[1.05rem] text-[#9ba1b0] leading-relaxed">
          <p>
            I am a Programmer and Full Stack Developer with a passion for building robust and scalable applications. My expertise lies in developing and maintaining web applications using Laravel and ReactJS, ensuring stable and optimized operations.
          </p>
          <p>
            Throughout my career, I have delivered multiple projects under tight deadlines, focusing on structured testing, debugging, and cross-functional collaboration. From creating scholarship management systems to developing GIS-based interactive maps, I enjoy taking on complex requirements and translating them into efficient technical solutions.
          </p>
          <p>
            In addition to web development, I am a Certified Kubernetes Administrator (CKA) and hold a Certified DevOps Foundation credential, allowing me to assist with deployment activities, CI/CD pipelines, and ongoing application maintenance to strengthen system reliability.
          </p>
          <p>
            Welcome to my portfolio, where I showcase my journey in building seamless digital experiences.
          </p>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-[32px] p-10 lg:p-12 mb-8 shadow-sm">
        <p className="text-[#6b6b77] text-xs font-semibold tracking-wider mb-6">CURIOUS OF MY STACK?</p>

        <h2 className="text-text-heading text-3xl font-bold mb-4 tracking-tight">
          Here is the toolbelt I keep around.
        </h2>
        <p className="text-[#9ba1b0] mb-10 max-w-2xl leading-relaxed">
          Grouped by the way I usually think about my work: interface, styling, backend support, and the other tools that help me ship things properly.
        </p>

        <div className="space-y-10">
          <ToolCategory title="Frontend" items={['ReactJS', 'JavaScript', 'HTML/CSS', 'JQuery', 'AJAX']} />
          <ToolCategory title="Backend" items={['PHP', 'Laravel', 'Laravolt', 'REST API', 'MySQL', 'MSSQL']} />
          <ToolCategory title="Tooling & DevOps" items={['Git', 'Sourcetree', 'Docker', 'Kubernetes', 'Linux', 'ArcGIS']} />
        </div>
      </div>


    </div>
  );
}

function ToolCategory({ title, items }) {
  return (
    <div>
      <h3 className="text-text-heading text-[1.1rem] font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <div key={index} className="bg-[#1f2029] border border-[#353540] text-[#9ba1b0] px-4 py-2.5 rounded-[14px] text-sm font-medium hover:text-text-heading hover:border-[#525263] transition-colors cursor-default shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}


About.layout = page => <MainLayout>{page}</MainLayout>;
