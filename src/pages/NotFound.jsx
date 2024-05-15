import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col justify-center items-center text-green-900">
        <b className="text-[100px]">404</b>
        <span className="text-[22px]">صفحه مورد نظر یافت نشد</span>
        <Link to="/" className="mt-10 bg-green-100 py-2 px-5 rounded-lg">
          برو به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
