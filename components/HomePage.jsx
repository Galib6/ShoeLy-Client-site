import { fetchDataFromApi } from "@/utils/api";
import React, { useEffect, useState } from "react";
import HeroBanner from "./HeroBanner";
import ProductCard from "./ProductCard";
import Wrapper from "./Wrapper";

const HomePage = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetchDataFromApi("/api/allproduct");
      setProducts(allProducts.slice(0, 9));
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
          {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
        </div>
        {/* products grid end */}
      </Wrapper>
    </main>
  );
};

export default HomePage;
