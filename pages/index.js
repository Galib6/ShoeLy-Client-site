import HeroBanner from "@/components/HeroBanner";
import HomePage from "@/components/HomePage";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import React, { useEffect, useState } from "react";

const index = () => {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
};
export default index;
