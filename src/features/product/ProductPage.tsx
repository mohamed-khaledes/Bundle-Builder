import { useParams } from 'react-router-dom';
import { useSystemQuery } from '../configurator/useSystemQuery';
import { useProductQuery } from './useProductQuery';
import { ProductDetail } from './components/ProductDetail';
import { ProductDetailSkeleton } from './components/ProductDetailSkeleton';
import { ProductFallback } from './components/ProductFallback';

export const ProductPage = () => {
  const { productId } = useParams();
  const { product, isLoading, isError, notFound, refetch } =
    useProductQuery(productId);
  useSystemQuery();

  return (
    <div className="min-h-screen bg-surface">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : notFound || !productId ? (
          <ProductFallback
            title="Product not found"
            body="We couldn't find that product. It may have been moved or removed."
          />
        ) : isError ? (
          <ProductFallback
            title="Couldn't load this product"
            body="Something went wrong reaching the catalog. Please try again."
            onRetry={() => refetch()}
          />
        ) : product ? (
          <ProductDetail product={product} />
        ) : null}
      </main>
    </div>
  );
};
