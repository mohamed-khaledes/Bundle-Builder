import { Button } from '../../../components/Button';

interface Props {
  nextTitle: string;
  onClick: () => void;
}

export const NextButton = ({ nextTitle, onClick }: Props) => (
  <div className="mt-4 flex justify-center">
    <Button
      variant="ghost"
      onClick={onClick}
      className="px-5 py-2.5 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      Next: {nextTitle}
    </Button>
  </div>
);
