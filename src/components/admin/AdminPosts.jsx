import React from "react";
import { PostList } from "../../pages/home/Posts";
import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../../../config/api.config";

const AdminPosts = () => {
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

export default AdminPosts;
