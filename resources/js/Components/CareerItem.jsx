export default function CareerItem({ date, role, company, link, description }) {
  return (
    <div className="relative">
      <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-[#6b6b77] rounded-full border-4 border-[#1f2029] ring-1 ring-[#353540]"></div>
      <p className="text-xs text-[#6b6b77] font-mono tracking-tight mb-2.5 uppercase font-medium">{date}</p>
      <h3 className="text-xl font-bold text-text-heading mb-1.5">{role}</h3>
      <a href={link} target="_blank" rel="noreferrer" className="inline-block text-[#888893] hover:text-text-heading mb-4 font-medium transition-colors text-[0.95rem]">
        {company} ↗
      </a>
      <p className="text-[#9ba1b0] leading-relaxed text-[1rem]">
        {description}
      </p>
    </div>
  );
}
