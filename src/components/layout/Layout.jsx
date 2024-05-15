import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <p className="flex items-center justify-center bg-slate-100 text-black py-3 rounded-lg mt-3">
        در حال توسعه...
      </p>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
