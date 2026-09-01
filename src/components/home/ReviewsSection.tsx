const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    review:
      "Product quality is very good and delivery was fast. I am really satisfied.",
    rating: 5,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    review:
      "The product was exactly as shown in the website. Packaging was also excellent.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sakib Hasan",
    review:
      "Good quality products at reasonable prices. I will definitely order again.",
    rating: 4,
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            What Our Customers Say
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Real feedback from our happy customers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm leading-6 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900">
                  {review.name}
                </p>

                <p className="text-xs text-gray-400">
                  Verified Customer
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}