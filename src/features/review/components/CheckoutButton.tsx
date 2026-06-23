import { useState } from 'react';
import { useUiConfig } from '../../configurator/hooks';
import { Button } from '../../../components/Button';
import { CheckoutModal } from './CheckoutModal';

export const CheckoutButton = () => {
  const uiConfig = useUiConfig();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setOpen(true)}
        className="w-full py-3.5 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {uiConfig?.checkoutLabel}
      </Button>
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
