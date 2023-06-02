import { fetchDataFromApi } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BrandBanner from "./BrandBanner";
import HeroBanner from "./HeroBanner";
import ProductCard from "./ProductCard";
import VIdeoCOmponent from "./VIdeoCOmponent";
import Wrapper from "./Wrapper";
import RelatedProducts from "./RelatedProducts";
import MembershipBanner from "./MembershipBanner";

const HomePage = ({ posts: products, relatedProducts }) => {
  return (
    <main>
      <HeroBanner />
      <div className="bg-[#EDE734] h-[150px] flex justify-center items-center">
        <h1 className="lg:text-[40px] text-[15px] font-bold mr-4">
          BECOME A MEMBER &amp; GET 10% OFF
        </h1>
        <Link href="/login">
          <button
            className="flex justify-center items-center lg:h-6 lg:p-5 h-4 p-3 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75 "
            // onClick={() => }
          >
            Sign in
          </button>
        </Link>
      </div>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-bold leading-tight">
            Air Max Pulse
          </div>
          <div className="text-md md:text-xl">
            Inspired by the energy of London's music scene comes the Air Max
            Pulse <br />A tough shiloette infused with an unreal sensation of
            air.
          </div>
          <div className="flex justify-center items-center mt-4">
            <Link href={"/category/1"}>
              <button className="flex justify-center items-center h-6 p-5 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75 ">
                Shop
              </button>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-[25px] pb-8 font-bold">Always Iconic</h1>
          <div className="grid grid-cols-3">
            <Link href="/category/1">
              <div>
                <img
                  src="https://i.postimg.cc/wBrQrsMS/01ee9453-ef32-4ddf-846e-47c72b921c06.webp"
                  className="h-[380px] w-[380px] object-cover rounded-sm"
                  alt=""
                />
                <p className="text-2xl mt-5">Jordan</p>
              </div>
            </Link>
            <Link href="category/2">
              <div>
                <img
                  src="https://i.postimg.cc/rsXCVXSj/c57c85fd-5b12-4a69-92fb-7b2b84680f27.webp"
                  className="h-[380px] w-[380px] object-cover rounded-sm"
                  alt=""
                />
                <p className="text-2xl mt-5">Classic Nikes</p>
              </div>
            </Link>
            <Link href="category/3">
              <div>
                <img
                  src="https://i.postimg.cc/qRCxHMCg/d5f1cb21-4546-411a-b6f5-9343d0d995e9.webp"
                  className="h-[380px] w-[380px] object-cover rounded-sm"
                  alt=""
                />
                <p className="text-2xl mt-5">Air Max</p>
              </div>
            </Link>
          </div>
        </div>
      </Wrapper>
      {/* heading and paragaph end */}
      <Wrapper>
        <h1 className="text-[25px] mt-28 font-bold">Best Products</h1>
        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.slice(0, 3).map((product, i) => (
            <ProductCard key={i} data={product} />
          ))}
        </div>
        {/* products grid end */}

        <div className="mt-[-50px]">
          <RelatedProducts sid={""} products={relatedProducts} />
        </div>

        <BrandBanner></BrandBanner>
        <MembershipBanner></MembershipBanner>
      </Wrapper>
    </main>
  );
};

export default HomePage;
