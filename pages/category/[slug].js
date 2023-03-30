import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

const Category = () => {
  const [products, setProducts] = useState();
  const [catName, setCatName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [currentPage, SetCurrentPage] = useState(1);
  const [postsPerPage, SetPostPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const slicedProduct = products?.slice(indexOfFirstPost, indexOfLastPost);
  console.log(slicedProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      const sProduct = await fetchDataFromApi(
        `/api/catagory/${router?.query?.slug}`
      );
      setProducts(sProduct);
      if (router?.query?.slug === "1") {
        setCatName("Jordan");
      } else if (router?.query?.slug === "2") {
        setCatName("Sneakers");
      } else if (router?.query?.slug === "3") {
        setCatName("Running Shoe");
      } else {
        setCatName("Football Shoe");
      }
      setIsLoading(false);
    };
    if (router?.query?.slug) {
      fetchProduct();
    }
  }, [router?.query?.slug]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {catName}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {slicedProduct?.map((product) => (
            <ProductCard key={product?._id} data={product} />
          ))}
        </div>
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {slicedProduct && (
          <Pagination
            currentPage={currentPage}
            SetCurrentPage={SetCurrentPage}
            postsPerPage={postsPerPage}
            products={products}
          ></Pagination>
        )}
        {/* PAGINATION BUTTONS END */}

        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center ">
            {/* <img src="/logo.svg" width={150} /> */}
            <div className="h-screen bg-white">
              <div className="flex justify-center items-center h-full">
                <img
                  className="h-16 w-16"
                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;
