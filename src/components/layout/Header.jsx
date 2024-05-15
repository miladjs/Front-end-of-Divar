import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../service/userService";
import Loader from "../Loader";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [cityOpen, setCityOpen] = useState(false);
  const [currentCity, setCurrentCiry] = useState("بندرعباس");
  const cities = ["تهران", "شیراز", "بندرعباس", "اصفهان", "یزد"];

  const cityHandler = (i) => {
    setCurrentCiry(i);
    setCityOpen(false);
  };

  useEffect(() => {
    setSearchParams({ city: currentCity });
  }, [currentCity]);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    setIsOpen(false);
  }, [data]);

  if (isLoading) return <Loader />;

  const logoutHandler = () => {
    navigate("/logout");
    return;
  };

  return (
    <div className="border-b border-gray-200 mb-5 py-5 flex flex-col gap-6 lg:flex-row justify-between items-center">
      <div className="flex justify-start items-center gap-7">
        <Link to="/" className="flex flex-col">
          <b className="text-[24px] text-green-800">دیوار</b>
        </Link>
        <button
          className="flex relative items-center gap-1 text-[18px] text-gray-600"
          onClick={() => setCityOpen(!cityOpen)}
        >
          <IoLocationOutline />
          <span>{currentCity ? currentCity : "بندرعباس"}</span>
          {cityOpen && (
            <div className="absolute top-10 right-0 bg-gray-300 py-4 px-10 z-30 rounded-lg flex flex-col gap-3">
              {cities.map((i) => {
                return (
                  <span
                    className="hover:bg-white"
                    key={i}
                    onClick={() => cityHandler(i)}
                  >
                    {i}
                  </span>
                );
              })}
            </div>
          )}
        </button>
      </div>
      <div className="flex items-center gap-7">
        <div>
          <div
            className="flex items-center gap-2 text-[17px] text-gray-600 relative cursor-pointer justify-center text-center"
            onClick={() =>
              data ? setIsOpen((prev) => !prev) : navigate("/auth")
            }
          >
            <FaRegUser />
            {data ? <span>داشبورد من</span> : <span>ورود به حساب</span>}

            {data && isOpen ? (
              <div className="flex flex-col z-50 absolute gap-4 bg-gray-300 rounded-lg px-3 py-5 w-[180px] top-16 right-0">
                <Link className="hover:bg-white" to="/dashboard/new">
                  ثبت آگهی جدید
                </Link>
                <Link className="hover:bg-white" to="/dashboard/posts">
                  آگهی های من
                </Link>
                <Link className="hover:bg-white" to="/dashboard/favorite">
                  علاقه مندی ها
                </Link>
                <Link className="hover:bg-white" to="/dashboard/profile">
                  پروفایل من
                </Link>
                <button className="hover:bg-white " onClick={logoutHandler}>
                  خروج از حساب
                </button>
                {data?.data?.role === "ADMIN" ? (
                  <Link
                    className="bg-white py-2 mt-4 flex justify-center rounded-lg"
                    to="/admin"
                  >
                    پنل مدیریت
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <Link to="/dashboard/new" className="btn btn-primary">
          <button>ثبت آگهی</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
