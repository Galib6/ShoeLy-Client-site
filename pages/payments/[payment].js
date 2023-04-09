import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import CheckOut from "@/components/CheckOut";
import { AuthContext } from "@/context/AuthProvider";
import PaymentsSIngleComponents from "@/components/PaymentsSIngleComponents";
import { API_URL } from "@/utils/urls";
import Wrapper from "@/components/Wrapper";
import { ImSpinner3 } from "react-icons/im";
import { useRouter } from "next/router";

const Payment = () => {
  const { setCart, user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const ammount = router.query.payment;

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/cart?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setCart(data);
        setIsLoading(false);
      });
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51M7c2bCrl3dQ57EJh6p0K0ILccXLLoZic6xAgaQnZ7ZrsQKLI2WbssYPxb0rR44ixMD9YIfKS224Axx1rhaR51Ug00qVpJJN6x"
  );

  return (
    <>
      <Head>
        <title>Shoe.Ly-Checkout</title>
      </Head>
      <Wrapper>
        <div>
          <div className="grid grid-cols-12 my-4">
            <div className="col-span-6 lg:min-h-screen">
              <div className="font-bold text-left text-[25px] py-5">Items</div>
              <hr className=" mt-[-5px] mb-2" />
              {!loading ? (
                cartItems?.map((item, i) => (
                  <PaymentsSIngleComponents key={i} data={item} />
                ))
              ) : (
                <div className="flex justify-center items-center mt-32">
                  <ImSpinner3 className="animate-spin ml-2" size={40} />
                  <h1>Initiating your payment. Please wait a while...</h1>
                </div>
              )}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="max-w-[600px]  col-span-5 mb-5">
              <Elements stripe={stripePromise}>
                <CheckOut
                  ammount={parseInt(ammount) - parseInt(ammount) * 0.15}
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
