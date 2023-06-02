import Link from "next/link";
import React from "react";

const MembershipBanner = () => {
  return (
    <div className="bg-black p-5 mb-4">
      <h1 className="text-white text-6xl font-extrabold">
        BECOME A <br /> MEMBER
      </h1>
      <p className="text-white my-2">Sign up free. Join the Community.</p>
      <div className="space-x-3">
        {" "}
        <Link href="/login">
          <button className="bg-white rounded-full p-2">Join us</button>
        </Link>
        <Link href="/signup">
          <button className="bg-white rounded-full p-2">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default MembershipBanner;
