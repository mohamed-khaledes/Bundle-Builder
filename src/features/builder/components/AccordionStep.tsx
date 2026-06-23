import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Step } from '../../configurator/configurator.types';
import { useStepProducts } from '../../configurator/hooks';
import { useStepSelection } from '../hooks/useStepSelection';
import { StepIcon } from '../../../components/StepIcon';
import { ProductCard } from './ProductCard';
import { NextButton } from './NextButton';
interface Props {
  step: Step;
}

export const AccordionStep = ({ step }: Props) => {
  const products = useStepProducts(step.id);
  const { open, count, toggle, nextStep, goNext } = useStepSelection(step.id);

  const headerId = `step-${step.id}-header`;
  const panelId = `step-${step.id}-panel`;

  return (
    <div
      className={
        open
          ? 'rounded-2xl bg-surface-accent p-3.5 sm:p-5'
          : 'border-t border-line'
      }
    >
      <h2 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className={`flex w-full flex-col rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${open ? '' : 'py-4'}`}
        >
          <span className="eyebrow">{step.label}</span>
          <span className="mt-1.5 flex items-center gap-2.5">
            <StepIcon
              name={step.icon}
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
              className="shrink-0 text-ink"
            />
            <span className="min-w-0 font-display text-[16px] font-semibold text-ink sm:text-[20px]">
              {step.title}
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[14px] font-medium text-brand">
              {count > 0 && (
                <span>
                  {count} selected<span className="sr-only"> in this step</span>
                </span>
              )}
              {open ? (
                <ChevronUp size={18} aria-hidden="true" />
              ) : (
                <ChevronDown size={18} aria-hidden="true" />
              )}
            </span>
          </span>
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        inert={!open || undefined}
        className={`accordion-body ${open ? 'open' : ''}`}
      >
        <div className="accordion-inner">
          <div className="pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
              {products.map((p, i) => {
                const orphan =
                  products.length % 2 === 1 && i === products.length - 1;
                return (
                  <div
                    key={p.id}
                    className={
                      orphan
                        ? 'xl:col-span-2 xl:mx-auto xl:w-[calc(50%-0.375rem)]'
                        : ''
                    }
                  >
                    <ProductCard product={p} />
                  </div>
                );
              })}
            </div>

            {nextStep && (
              <NextButton nextTitle={nextStep.title} onClick={goNext} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
