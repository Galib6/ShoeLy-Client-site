import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import CartItem from "@/components/CartItem";
import CheckOut from "@/components/CheckOut";
import { AuthContext } from "@/context/AuthProvider";
import PaymentsSIngleComponents from "@/components/PaymentsSIngleComponents";
import { fetchDataFromApi } from "@/utils/api";
import { API_URL } from "@/utils/urls";
import Wrapper from "@/components/Wrapper";

const Payment = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    const cartItemsLoader = async () => {
      const cartItems = await fetchDataFromApi(`/api/cart`);
      setCartItems(cartItems);
    };

    cartItemsLoader();
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51M7c2bCrl3dQ57EJh6p0K0ILccXLLoZic6xAgaQnZ7ZrsQKLI2WbssYPxb0rR44ixMD9YIfKS224Axx1rhaR51Ug00qVpJJN6x"
  );

  //   if (loading) {
  //     return <progress className="progress w-full "></progress>;
  //   }
  return (
    <>
      <Head>
        <title>Shoe.Ly-Checkout</title>
      </Head>
      <Wrapper>
        <div>
          <div className="grid grid-cols-12 my-4">
            <div className="col-span-6 lg:min-h-screen">
              <div className="font-bold text-left text-[25px] py-5">
                Cart Items
              </div>
              <hr className=" mt-[-5px] mb-2" />
              {cartItems?.map((item, i) => (
                <PaymentsSIngleComponents key={i} data={item} />
              ))}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="max-w-[600px] place-self-center col-span-5 mb-5">
              <Elements stripe={stripePromise}>
                <CheckOut
                //   ammount={ammount}
                //   id={_id}
                //   courseDetails={courseDetails}
                ></CheckOut>
              </Elements>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Payment;
