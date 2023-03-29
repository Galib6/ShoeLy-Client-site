import { fetchDataFromApi } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BrandBanner from "./BrandBanner";
import HeroBanner from "./HeroBanner";
import ProductCard from "./ProductCard";
import VIdeoCOmponent from "./VIdeoCOmponent";
import Wrapper from "./Wrapper";

const HomePage = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetchDataFromApi("/api/allproduct");
      setProducts(allProducts.slice(0, 6));
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <HeroBanner />
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
              <button
                className="flex justify-center items-center h-6 p-5 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75 "
                // onClick={() => }
              >
                Shop
              </button>
            </Link>
          </div>
        </div>
        {/* heading and paragaph end */}
        <div class="bg-[#EDE734] h-[150px] flex justify-center items-center">
          <h1 className="text-[40px] font-bold mr-4">
            BECOME A MEMBER &amp; GET 10% OFF
          </h1>
          <button
            className="flex justify-center items-center h-6 p-5 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75 "
            // onClick={() => }
          >
            Sign in
          </button>
        </div>
        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* products grid end */}
        {/* <VIdeoCOmponent></VIdeoCOmponent> */}
        <BrandBanner></BrandBanner>
      </Wrapper>
    </main>
  );
};

export default HomePage;
