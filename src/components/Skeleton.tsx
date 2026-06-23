interface Props {
  className?: string;
  rounded?: string;
}

export const Skeleton = ({ className = '', rounded = 'rounded-md' }: Props) => (
  <span
    aria-hidden="true"
    className={`skeleton block ${rounded} ${className}`}
  />
);
