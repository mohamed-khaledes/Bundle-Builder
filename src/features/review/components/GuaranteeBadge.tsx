import satisfactionBadge from '../../../assets/satisfaction-badge.png';
import type { GuaranteeInfo } from '../../configurator/configurator.types';

interface Props {
  guarantee: GuaranteeInfo;
}

export const GuaranteeBadge = ({ guarantee }: Props) => (
  <>
    <img
      src={satisfactionBadge}
      alt="100% Wyze satisfaction guarantee"
      width={80}
      height={80}
      className="h-16 w-16 shrink-0 md:h-20 md:w-20"
    />
    <div className="hidden md:block xl:hidden">
      <h3 className="font-display text-[17px] font-semibold text-ink">
        {guarantee.title}
      </h3>
      <p className="mt-1 text-[14px] leading-snug text-muted">
        {guarantee.body}
      </p>
    </div>
  </>
);
