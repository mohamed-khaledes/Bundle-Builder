import { useReviewGroups, useTotals, useUiConfig } from '../configurator/hooks';
import { formatMoney } from '../configurator/pricing';
import { ReviewGroup } from './components/ReviewGroup';
import { ShippingRow } from './components/ShippingRow';
import { GuaranteeBadge } from './components/GuaranteeBadge';
import { TotalRow } from './components/TotalRow';
import { SavingsCallout } from './components/SavingsCallout';
import { CheckoutButton } from './components/CheckoutButton';
import { SaveForLaterLink } from './components/SaveForLaterLink';

const LiveTotal = () => {
  const { total } = useTotals();
  return (
    <p className="sr-only" role="status" aria-live="polite">
      Order total {formatMoney(total)}
    </p>
  );
};

export const ReviewPanel = () => {
  const groups = useReviewGroups();
  const uiConfig = useUiConfig();
  if (!uiConfig) return null;

  return (
    <aside aria-label="Your security system" className="xl:sticky xl:top-6">
      <LiveTotal />
      <div className="rounded-3xl bg-surface-accent p-5 sm:p-6">
        <div className="md:grid md:grid-cols-2 md:gap-x-8 xl:block">
          {/* ── Items column ── */}
          <div>
            <span className="eyebrow block md:hidden xl:block">
              {uiConfig.reviewEyebrow}
            </span>
            <h2 className="mt-1 font-display text-[24px] font-bold leading-tight text-ink">
              {uiConfig.reviewHeading}
            </h2>
            <p className="mt-1.5 text-[14px] leading-snug text-muted">
              {uiConfig.reviewSubtitle}
            </p>

            <div className="mt-4">
              {groups.map((g) => (
                <ReviewGroup
                  key={g.category}
                  category={g.category}
                  lines={g.lines}
                />
              ))}
              <ShippingRow shipping={uiConfig.shipping} />
            </div>
          </div>

          {/* ── Summary column ── */}
          <div className="mt-6 md:mt-0">
            <div className="flex items-center gap-4 md:items-start">
              <GuaranteeBadge guarantee={uiConfig.guarantee} />
              <div className="flex-1 md:hidden xl:block">
                <TotalRow />
              </div>
            </div>

            <div className="mt-5 hidden md:block xl:hidden">
              <TotalRow />
            </div>

            <div className="mt-3">
              <SavingsCallout />
            </div>
            <div className="mt-4">
              <CheckoutButton />
            </div>
            <div className="mt-3">
              <SaveForLaterLink />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
