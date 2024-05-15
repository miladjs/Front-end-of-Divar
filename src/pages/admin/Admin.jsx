import React from "react";
import { Link, Outlet } from "react-router-dom";

const list = [
  {
    name: "پیشخوان",
    link: "",
  },
  {
    name: "آگهی ها",
    link: "posts",
  },
  {
    name: "دسته بندی ها",
    link: "categorys",
  },
];

const Admin = () => {
  return (
    <div className="grid grid-cols-[1fr_4fr] gap-4">
      <aside className="border-l border-gray-200 py-3">
        <h2 className="font-normal text-[20px] border-gray-200 pb-2 mb-4 mr-2">
          پیشخوان مدیر
        </h2>
        <ul>
          {list.map((item) => (
            <li key={item.name}>
              <Link
                className="px-5 py-4 bg-gray-100 flex hover:bg-gray-200 my-2 rounded-lg ml-3"
                to={item.link}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
