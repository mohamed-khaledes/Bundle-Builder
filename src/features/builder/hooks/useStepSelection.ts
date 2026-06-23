import { useCallback } from 'react';
import { useStore } from '../../configurator/store';
import { useStepCount, useSteps } from '../../configurator/hooks';

export const useStepSelection = (stepId: string) => {
  const steps = useSteps();
  const open = useStore((s) => s.openStep === stepId);
  const toggleStep = useStore((s) => s.toggleStep);
  const goToNextStep = useStore((s) => s.goToNextStep);
  const count = useStepCount(stepId);

  const idx = steps.findIndex((s) => s.id === stepId);
  const nextStep = steps[idx + 1];

  const toggle = useCallback(() => toggleStep(stepId), [toggleStep, stepId]);
  const goNext = useCallback(
    () => goToNextStep(stepId),
    [goToNextStep, stepId]
  );

  return { open, count, toggle, nextStep, goNext };
};
