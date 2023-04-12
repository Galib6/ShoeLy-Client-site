import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div>
      <section class="flex flex-col items-center justify-center bg-white py-16">
        <div class="max-w-2xl text-center">
          <h1 class="text-4xl font-bold mb-8">About Shoe Store</h1>
          <p class="text-xl leading-relaxed mb-8">
            At Shoe.Ly, we believe that everyone deserves comfortable and
            stylish footwear. That's why we offer a wide range of shoes for men,
            women, and children, in various styles and sizes.
          </p>
          <p class="text-xl leading-relaxed mb-8">
            Our shoes are made from high-quality materials and are designed to
            provide the best possible fit and support. We are committed to
            providing our customers with excellent service, and we strive to
            make every shopping experience with us a pleasant one.
          </p>
          <Link
            href="/"
            class="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default index;
