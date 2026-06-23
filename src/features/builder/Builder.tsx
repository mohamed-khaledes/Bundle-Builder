import { useSteps, useUiConfig } from '../configurator/hooks';
import { AccordionStep } from './components/AccordionStep';

export const Builder = () => {
  const steps = useSteps();
  const uiConfig = useUiConfig();

  return (
    <section aria-label="Security system builder">
      <h1 className="mb-4 text-center font-display text-[30px] font-bold text-ink md:hidden">
        {uiConfig?.mobileHeading}
      </h1>
      <div>
        {steps.map((step) => (
          <AccordionStep key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
};
