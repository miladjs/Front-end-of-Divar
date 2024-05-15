import React from "react";
import { PostList } from "../home/Posts";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../../../config/api.config";

const MyPosts = () => {
  const getMyPosts = () => api.get("/post/my");

  const { data, isLoading, error } = useQuery({
    queryKey: ["myposts"],
    queryFn: getMyPosts,
  });

  if (isLoading) return <Loader />;

  return (
    <main className="">
      <PostList data={data?.data.posts} />
    </main>
  );
};

export default MyPosts;
