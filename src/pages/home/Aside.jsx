import React, { useState } from "react";
import { getCategorys } from "../../components/admin/AdminCategorys";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const Aside = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categorys"],
    queryFn: getCategorys,
  });

  if (isLoading) return <Loader />;

  return (
    <aside>
      <h2 className="font-bold text-[16px]">دسته بندی</h2>
      <div className="flex flex-col items-start mt-4">
        <button
          onClick={() => setSearchParams({})}
          className=" w-full text-right py-3 border-b hover:bg-slate-100 px-3 flex items-center justify-between"
        >
          همه دسته بندی ها
        </button>
        {data?.data && data.data.length > 0
          ? data.data.map((item) => {
              return <CateCard key={item._id} item={item} />;
            })
          : "دسته بندی یافت نشد"}
      </div>
    </aside>
  );
};

export default Aside;

const CateCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const setCategory = (id) => {
    if (!searchParams.get("category")) {
      setSearchParams((prev) => [...prev.entries(), ["category", id]]);
    }
  };

  return (
    <div className={`${isOpen ? "bg-gray-300 bg-opacity-40" : null} w-full`}>
      <button
        className=" w-full text-right py-3 border-b hover:bg-slate-100 px-3 flex items-center justify-between"
        onClick={() =>
          item?.children?.length > 0
            ? setIsOpen(!isOpen)
            : setCategory(item._id)
        }
      >
        <span>{item.name}</span>
        {item?.children?.length > 0 ? (
          <IoIosArrowDown
            className={` transition-all ${isOpen ? "rotate-0" : "rotate-90"}`}
          />
        ) : null}
      </button>
      {isOpen ? (
        <div>
          {item?.children?.length > 0
            ? item.children.map((i) => {
                return <CateCard key={i._id} item={i} />;
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};
