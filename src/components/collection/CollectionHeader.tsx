import Link from "next/link";
import Container from "@/components/common/Container";

interface CollectionHeaderProps {
  title: string;
  description: string;
}

export default function CollectionHeader({
  title,
  description,
}: CollectionHeaderProps) {
  return (
    <section className="border-b border-gray-100 bg-gray-50">
      <Container>
        <div className="py-8 sm:py-10">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="transition hover:text-[#6044f0]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-800">
              {title}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}