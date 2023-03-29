import React, { useContext, useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import {
  getDiscountedPrice,
  getDiscountedPricePercentage,
} from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/urls";
import { ImSpinner8 } from "react-icons/im";
import { AuthContext } from "@/context/AuthProvider";

const ProductDetails = () => {
  const { setCart, cart } = useContext(AuthContext);
  const [product, setProduct] = useState();
  const [sameCatProduct, setSameCatProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showError, setShowError] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const sProduct = await fetchDataFromApi(
        `/api/singleproduct?id=${router?.query?.slug}`
      );
      setProduct(sProduct);
    };
    if (router?.query?.slug) {
      fetchProduct();
    }
  }, [router?.query?.slug]);

  useEffect(() => {
    const fetchProduct = async () => {
      const sProduct = await fetchDataFromApi(`/api/catagory/${product?.pid}`);
      setSameCatProduct(sProduct);
    };
    if (product?.pid) {
      fetchProduct();
    }
  }, [product?.pid]);

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return setShowError(true);
    setCartLoading(true);
    const { pid, title, suntitle, price, thumb, _id } = product;
    const productForCart = {
      pid,
      title,
      suntitle,
      price,
      selectedSize,
      thumb,
      productId: _id,
    };
    fetch(`${API_URL}/api/cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productForCart),
    })
      .then((res) => res.json())
      .then((res) => {
        setCartLoading(false);
        setCart([...cart, productForCart]);
        notify();
        console.log(cart);
      });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="  w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
            <ProductDetailsCarousel images={product?.pics} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className=" flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {product?.title}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">
              {product?.suntitle}
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8356;{getDiscountedPrice(product?.price, 0.15)}
              </p>
              {product?.price && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#8356;{product.price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {15}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {product?.size.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.sta
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.type ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item?.type);
                      setShowError(false);
                    }}
                  >
                    {item?.type}
                  </div>
                ))}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            {!cartLoading ? (
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex justify-center items-center"
                onClick={handleAddToCart}
              >
                <ImSpinner8 className="animate-spin " />
              </button>
            )}
            {/* ADD TO CART BUTTON END */}

            {/* WHISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISHLIST BUTTON END */}

            <div className="pb-8">
              <p>Shipping*</p>
              <p>
                To get accurate shipping information{" "}
                <span className="underline">Edit Location</span>
              </p>
            </div>

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{product?.des}</ReactMarkdown>
              </div>
            </div>

            <div>
              <ul className="list-disc space-y-2">
                <li>Shown: {product?.color}</li>
                <li>Style: {product?.Style} </li>
              </ul>
            </div>
          </div>
          {/* right column end */}
        </div>

        {sameCatProduct && (
          <RelatedProducts sid={product._id} products={sameCatProduct} />
        )}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
