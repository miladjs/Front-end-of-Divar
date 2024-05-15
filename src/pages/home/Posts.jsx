import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import api from "./../../../config/api.config";
import Loader from "./../../components/Loader";
import { Link, useSearchParams } from "react-router-dom";
import { getProfile } from "../../../service/userService";
import { toast } from "react-toastify";

const Posts = () => {
  const getPosts = () => api.get("/");

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <Loader />;

  return (
    <main className="">
      <PostList data={data?.data.posts} />
    </main>
  );
};

export default Posts;

export const PostList = ({ data }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [displayPost, setDisplayPost] = useState([]);

  useEffect(() => {
    const category = searchParams.get("category");
    let city = searchParams.get("city");

    const items = data?.filter((i) => i.city === city);
    if (category) {
      const filted = city
        ? items?.filter((i) => i.category === category)
        : data?.filter((i) => i.category === category);
      setDisplayPost(filted);
    } else {
      setDisplayPost(city ? items : data);
    }
  }, [searchParams]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 grid-cols-1">
      {displayPost && displayPost.length > 0 ? (
        displayPost.map((item) => {
          return <PostCard key={item._id} item={item} />;
        })
      ) : (
        <div className="bg-green-900 text-green-200 py-2 px-4 rounded-lg text-center flex w-full justify-center">
          هیچ آگهی یافت نشد
        </div>
      )}
    </div>
  );
};

export const PostCard = ({ item }) => {
  const deletepost = (id) => api.delete(`/post/delete/${id}`);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletepost,
    onSuccess: () => {
      toast.success(`با موفقیت حذف شد`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (!item) return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-2 border p-3 gap-2 relative">
      <div className="flex flex-col justify-between items-start ">
        {data?.data?.role === "ADMIN" ? (
          <button
            className="bg-red-900 text-red-100 py-2 px-4 absolute left-0 top-0 text-[14px] z-30 hover:bg-red-600"
            onClick={() => mutate(item._id)}
          >
            حذف آگهی
          </button>
        ) : null}
        <Link to={`/post/${item._id}`} className="text-[18px] mt-1">
          {item?.options?.title}
        </Link>
        <div className="flex flex-col items-start">
          <span className="text-gray-500 font-light mb-0">
            {item.amount.toLocaleString("en-GB", { timeZone: "UTC" })} تومان
          </span>
          <span className="text-[14px] text-green-700 font-light">
            {item.city}
          </span>
        </div>
      </div>
      <Link to={`/post/${item._id}`}>
        <img
          className="w-full h-[160px] object-cover"
          src="/notfound.png"
          alt={item?.options?.title}
        />
      </Link>
    </div>
  );
};
