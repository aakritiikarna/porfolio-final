export default function SectionHead({ title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl md:mb-10">
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
