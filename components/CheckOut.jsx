import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";
import { AuthContext } from "@/context/AuthProvider";
import { API_URL } from "@/utils/urls";
import { useRouter } from "next/router";

const CheckOut = ({ ammount }) => {
  const [cardError, setCarderror] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectonId] = useState("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (ammount && user) {
      const order = {
        price: ammount,
        email: user?.email,
        name: user?.displayName,
        date: Date(),
      };
      // Create PaymentIntent as soon as the page loads
      fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // authorization: `bearer ${localStorage.getItem("s-token")}`,
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    // const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    // console.log(email, phone, address)
    //
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCarderror(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCarderror("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setCarderror(confirmError.message);

      return;
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      // store data
      const payment = {
        ammount,
        transectionId: paymentIntent.id,
        email: user?.email,
        productId: Math.floor(Math.random() * 9000000000) + 1000000000,
        phone,
        address,
      };
      fetch(`${API_URL}/payments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // authorization: `bearer ${localStorage.getItem("s-token")}`
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congratulation! Your payment completed");
            setTransectonId(paymentIntent.id);
            form.reset();
            alert("payment successful", "success");
          }
        });
      // window.location.href = `/course/enrolled/${_id}`;
      router.push("/success");
    }
    console.log("paymentIntent", paymentIntent);
    setProcessing(false);
  };

  return (
    <div className="p-16 border border-inherit  rounded-lg ">
      <form className="mt-[-40px]" onSubmit={handleSubmit}>
        <div className=" p-5">
          <div>
            <h1 className="text-4xl">$ {ammount}</h1>
          </div>
          <p className="text-[13px]">Due {Date().slice(4, 15)}</p>

          <p className="mt-5 font-bold">To:{user?.displayName}</p>
          <p className="my-1">From: Shoe.Ly Inc. </p>
          <p className="my-1 font-bold">
            Please Check Carefully Before Payment
          </p>
        </div>
        <div className="divider"></div>
        <h2 className="text-2xl text-center my-[-10px] flex justify-center items-center">
          Pay with <FaStripe className="ml-2 my-[-20px] " size={60} />
        </h2>
        <div className="divider"></div>
        {/* <label className="label mb-3 ">
          <span className="label-text">Your Email:</span>
        </label>
        <div className="form-control h-[3rem]">
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            className="input input-bordered input-info h-[3rem]"
            required
          />
        </div> */}
        <label className="label mt-3">
          <span className="label-text">Your Phone Number:</span>
        </label>
        <div className="form-control h-[2rem] ">
          <input
            name="phone"
            type="number"
            placeholder="Your Phone Number"
            className="input input-bordered  "
            required
          />
        </div>
        <label className="label mt-3">
          <span className="label-text">Your Address :</span>
        </label>
        <div className="form-control h-[2rem] ">
          <input
            name="address"
            type="text"
            placeholder="Your Address"
            className="input input-bordered  "
            required
          />
        </div>
        <label className="label mt-3">
          <span className="label-text">Your Card Info:</span>
        </label>

        <div className="input input-bordered h-[2rem] pt-1 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="btn btn-sm btn-error mt-6 w-full text-white"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transectionId:{" "}
            <span className="font-bold"> {transectionId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
