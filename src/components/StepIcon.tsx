import { Camera, Shield, Radar, Grid3x3, type LucideProps } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Camera,
  Shield,
  Radar,
  Grid3x3,
};

export const StepIcon = ({
  name,
  ...props
}: { name: string } & LucideProps) => {
  const Comp = ICONS[name] ?? Camera;
  return <Comp {...props} />;
};
