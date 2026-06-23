import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { useTotals } from '../../configurator/hooks';
import { formatMoney } from '../../configurator/pricing';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-muted/60 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 motion-reduce:transition-none';

const legendClass = 'eyebrow mb-2';

// Labelled text field.
const Field = ({
  label,
  id,
  ...props
}: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-[12px] font-semibold text-ink">
      {label}
    </label>
    <input id={id} className={inputClass} {...props} />
  </div>
);

export const CheckoutModal = ({ open, onClose }: Props) => {
  const { total } = useTotals();
  const [submitted, setSubmitted] = useState(false);

  // Reset to the form whenever the modal is (re)opened.
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // UI only — no real payment is processed.
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={submitted ? 'Order confirmed' : 'Checkout'}
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <CheckCircle2 size={56} className="text-save" aria-hidden="true" />
          <div>
            <h3 className="font-display text-[20px] font-semibold text-ink">
              Order placed!
            </h3>
            <p className="mt-1 text-[14px] text-muted">
              Thanks for your purchase. A confirmation for{' '}
              <span className="font-semibold text-ink">
                {formatMoney(total)}
              </span>{' '}
              is on its way to your inbox.
            </p>
          </div>
          <Button
            autoFocus
            onClick={onClose}
            className="px-6 py-2.5 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <fieldset>
            <legend className={legendClass}>Contact</legend>
            <Field
              label="Email"
              id="co-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </fieldset>

          <fieldset>
            <legend className={legendClass}>Shipping address</legend>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <Field
                label="Full name"
                id="co-name"
                autoComplete="name"
                placeholder="Jane Doe"
                required
              />
              <Field
                label="Address"
                id="co-address"
                autoComplete="address-line1"
                placeholder="123 Main St"
                required
              />
              <Field
                label="Apartment, suite, etc. (optional)"
                id="co-address2"
                autoComplete="address-line2"
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="City"
                  id="co-city"
                  autoComplete="address-level2"
                  required
                />
                <Field
                  label="State"
                  id="co-state"
                  autoComplete="address-level1"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="ZIP code"
                  id="co-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000"
                  required
                />
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="co-country"
                    className="text-[12px] font-semibold text-ink"
                  >
                    Country
                  </label>
                  <select
                    id="co-country"
                    className={inputClass}
                    autoComplete="country-name"
                    defaultValue="United States"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className={legendClass}>Payment</legend>
            <div className="flex flex-col gap-3">
              <Field
                label="Card number"
                id="co-card"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Expiry (MM/YY)"
                  id="co-exp"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  required
                />
                <Field
                  label="CVC"
                  id="co-cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  required
                />
              </div>
              <Field
                label="Name on card"
                id="co-cc-name"
                autoComplete="cc-name"
                placeholder="Jane Doe"
                required
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="text-[14px] text-muted">Total</span>
            <span className="tnum text-[20px] font-bold text-brand">
              {formatMoney(total)}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="flex w-full items-center justify-center gap-2 py-3 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Lock size={15} aria-hidden="true" /> Pay {formatMoney(total)}
          </Button>
          <p className="-mt-2 text-center text-[12px] text-muted">
            This is a demo — no payment is processed.
          </p>
        </form>
      )}
    </Modal>
  );
};
