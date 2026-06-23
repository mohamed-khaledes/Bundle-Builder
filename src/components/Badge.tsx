interface Props {
  text: string;
}

export const Badge = ({ text }: Props) => (
  <span className="absolute left-3 top-3 z-10 rounded-md bg-brand px-2 py-1 text-[11px] font-semibold leading-none text-white shadow-sm">
    {text}
  </span>
);
