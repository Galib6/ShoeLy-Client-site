import { getDiscountedPrice } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ data }) => {
  return (
    <Link
      href={`/product/${data._id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        className=" h-[380px] w-[380px] object-cover"
        src={data.thumb}
        alt={data.title}
      />

      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{data.title}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            &#8356;{getDiscountedPrice(data?.price, 0.15)}
          </p>

          {data.price && (
            <>
              <p className="text-base  font-medium line-through">
                &#8377;{data?.price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {15}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
