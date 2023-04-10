import HeroBanner from "@/components/HeroBanner";
import HomePage from "@/components/HomePage";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { API_URL } from "@/utils/urls";
import React, { useEffect, useState } from "react";

const index = ({ posts, relatedProducts }) => {
  return (
    <>
      <HomePage posts={posts} relatedProducts={relatedProducts}></HomePage>
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/api/allproduct`);
  const data = await res.json();
  const Products = await fetch(`${API_URL}/api/catagory/4`);
  const relatedProducts = await Products.json();

  return {
    props: { posts: data, relatedProducts },
  };
}
export default index;
