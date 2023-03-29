import React from "react";
// import BgVideo from "../asset/gs.mp4";

const VIdeoCOmponent = () => {
  return (
    <div class="relative flex items-center justify-center h-screen overflow-hidden">
      <div class="relative z-30 p-5 text-2xl text-white bg-purple-300 bg-opacity-50 rounded-xl">
        Welcome to my site!
      </div>
      <video
        class="absolute z-10 w-auto"
        autoplay={true}
        loop
        muted
        src="as.mp4"
        controls={true}
      ></video>
    </div>
  );
};

export default VIdeoCOmponent;
