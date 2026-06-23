import { AnimatePresence, motion } from 'framer-motion';
import type { ReviewGroupData } from '../../configurator/selectors';
import { SINGLE } from '../../configurator/keys';
import { ReviewLineItem } from './ReviewLineItem';
import { PlanLine } from './PlanLine';

export const ReviewGroup = ({ category, lines }: ReviewGroupData) => (
  <div className="border-t border-line pt-3">
    <h3 className="eyebrow mb-0.5">{category}</h3>
    <AnimatePresence initial={false}>
      {lines?.map((line) => (
        <motion.div
          key={line.key}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          style={{ overflow: 'hidden' }}
        >
          {category === 'Plan' ? (
            <PlanLine product={line.product} qty={line.qty} />
          ) : (
            <ReviewLineItem
              productId={line.product.id}
              variantId={line.variant?.id ?? SINGLE}
            />
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
