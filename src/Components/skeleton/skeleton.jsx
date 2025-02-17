import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // برای استایل‌دهی

const LoadingSkeletonExample = () => {
  return (
    <div>
      <div>
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={300} />
        <Skeleton height={300} width={300} />
      </div>
    </div>
  );
};

export default LoadingSkeletonExample;
