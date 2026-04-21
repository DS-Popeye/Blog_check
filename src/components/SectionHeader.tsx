type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: { href: string; label: string };
};

export function SectionHeader({ eyebrow, title, text, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>
      {action ? (
        <a className="button button-secondary" href={action.href}>
          {action.label}
        </a>
      ) : null}
    </div>
  );
}
