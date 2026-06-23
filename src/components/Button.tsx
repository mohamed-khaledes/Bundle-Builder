import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-dark active:scale-[0.99]',
  ghost:
    'border border-brand/30 bg-surface text-brand hover:bg-brand-soft active:scale-[0.99]',
};

export const Button = ({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: Props) => (
  <button
    type={type}
    className={`rounded-xl font-semibold transition-colors motion-reduce:transition-none ${VARIANTS[variant]} ${className}`}
    {...props}
  />
);
