import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const list = [
  {
    name: "ثبت آگهی",
    link: "new",
  },
  {
    name: "آگهی های من",
    link: "posts",
  },
  {
    name: "علاقه مندی های من",
    link: "favorite",
  },
  {
    name: "مشخصات من",
    link: "profile",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/logout");
    return;
  };

  return (
    <div className="grid lg:grid-cols-[1fr_4fr] grid-cols-1fr gap-4">
      <aside className="border-l border-gray-200 py-3">
        <h2 className="font-normal text-[20px] border-gray-200 pb-2 mb-4 mr-2">
          پنل کاربری
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
          <li>
            <button
              onClick={logoutHandler}
              className="my-2 flex items-center gap-3 mt-6 p-3 text-gray-600"
            >
              <CiLogout className="text-[20px]" />
              <span>خروج از حساب</span>
            </button>
          </li>
        </ul>
      </aside>
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
