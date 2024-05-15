import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../service/userService";
import Loader from "./components/Loader";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import NewItem from "./pages/dashboard/NewItem";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminPosts from "./components/admin/AdminPosts";
import AdminCategorys from "./components/admin/AdminCategorys";
import AdminUsers from "./components/admin/AdminUsers";
import Logout from "./components/Logout";
import NotFound from "./pages/NotFound";
import Post from "./pages/home/Post";
import MyPosts from "./pages/dashboard/MyPosts";
import PageinWork from "./PageinWork";

const Router = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <Loader />;

  return (
    <Routes>
      {/* home */}
      <Route path="*" element={<NotFound />} />

      <Route path="/logout" element={<Logout />} />

      {/* home */}
      <Route index element={<Home />} />

      {/* auth */}
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <Auth />}
      />

      {/* dashboard */}
      <Route
        path="/dashboard"
        element={!data ? <Navigate to="/auth" /> : <Dashboard />}
      >
        <Route index element={<span>dashboard</span>} />
        <Route path="new" element={<NewItem />} />
        <Route path="posts" element={<MyPosts />} />
        <Route path="favorite" element={<PageinWork />} />
        <Route path="profile" element={<PageinWork />} />
      </Route>

      {/* post */}
      <Route path="/post/:id" element={<Post />} />

      {/* admin */}
      <Route
        path="/admin"
        element={
          data && data?.data.role === "ADMIN" ? (
            <Admin />
          ) : (
            <b className="bg-red-300 text-red-900 py-3 px-5 rounded-lg items-center justify-center flex">
              شما دسترسی به این بخش ندارید ... !
            </b>
          )
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="categorys" element={<AdminCategorys />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default Router;
