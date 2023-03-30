import React from "react";

const PaymentsSIngleComponents = ({ data }) => {
  return (
    <div className="flex justify-center items-center gap-1 md:gap-1 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={data.thumb} alt="df" width={100} height={100} />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-md md:text-sm font-semibold text-black/[0.8]">
            {data.title}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {data.suntitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{data.price}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {data.suntitle}
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:{data.selectedSize}</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity: 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsSIngleComponents;
