import React from "react";

const BrandBanner = () => {
  return (
    <section class="w-full bg-white dark:bg-wickeddark">
      <div class="relative items-center w-full px-5 pb-12  mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div class="flex w-full mx-auto text-left">
          <div class="relative inline-flex items-center mx-auto align-middle">
            <div class="pb-12 text-center">
              <h1 class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                Our product supply partners <br class="hidden lg:block" />
                Best Companys are with us!
              </h1>
            </div>
          </div>
        </div>

        <div class="mx-auto text-center">
          <div class="grid grid-cols-5 gap-4 mx-auto lg:grid-cols-5">
            <div>
              <img
                class="h-4 mx-auto lg:h-12"
                src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo-700x394.png"
                alt="Figma"
              />
            </div>
            <div>
              <img
                class="h-4 mx-auto lg:h-12"
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png"
                alt="Framer"
              />
            </div>
            <div>
              <img
                class="h-4 mx-auto lg:h-12"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png"
                alt="Sketch "
              />
            </div>
            <div>
              <img
                class="h-4 mx-auto lg:h-12"
                src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Converse_shoe_company_logo.png"
                alt="Sketch "
              />
            </div>
            <div>
              <img
                class="h-4 mx-auto lg:h-12"
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Reebok_logo20.png"
                alt="Invision"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
