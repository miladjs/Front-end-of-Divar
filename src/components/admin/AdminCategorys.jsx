import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "./../../../config/api.config";
import Loader from "./../Loader";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

export const getCategorys = () => api.get("/category");

const AdminCategorys = () => {
  const [newCategory, setNewCategory] = useState({
    name: null,
    slug: null,
    parent: null,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categorys"],
    queryFn: getCategorys,
  });

  const saveCategory = (categoryDto) => {
    const parent = categoryDto.parent || null;

    let data = {
      name: categoryDto.name,
      slug: categoryDto.slug,
      icon: categoryDto.slug,
      parent,
    };

    if (!parent) {
      delete data.parent;
    }

    return api.post("/category", data);
  };

  const {
    mutateAsync,
    data: dataMutate,
    isLoading: loadingMutate,
    error,
  } = useMutation({
    mutationFn: saveCategory,
    onSuccess: (data, variables, context) => {
      if (!data) {
        toast.error("دسته بندی قبلا ثبت شده");
        return;
      }
      toast.success("دسته بندی با موفقیت ثبت شد");
      refetch();
      return;
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) {
      return;
    }

    mutateAsync(newCategory);
  };

  const changeHandler = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value.length > 0 ? e.target.value : null,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-8">
      <div className="add-category">
        <h3 className="text-[20] font-bold mb-3">اضافه کردن دسته بندی</h3>
        <div className="flex">
          <form
            onSubmit={submitHandler}
            onChange={changeHandler}
            className="flex gap-2 items-center"
          >
            <input
              name="name"
              className="input-primary"
              type="text"
              placeholder="اسم دسته بندی"
              defaultValue={newCategory.name}
            />
            <input
              name="slug"
              className="input-primary"
              type="text"
              placeholder="slug"
              defaultValue={newCategory.slug}
            />

            <select name="parent" className="input-primary">
              <option value={``}>دسته بندی اصلی</option>
              {data?.data.map((item) => {
                return <Optionsitem key={item._id} item={item} />;
              })}
            </select>

            {loadingMutate ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-primary">
                افزودن
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="border p-4 rounded-lg space-y-4">
        {data &&
          data.data.map((item) => {
            return (
              <CategoryCard key={item._id} item={item} refetch={refetch} />
            );
          })}
      </div>
    </div>
  );
};

export default AdminCategorys;

const Optionsitem = ({ item }) => {
  return (
    <>
      <option value={item._id}>{`+ ${item.name}`}</option>
      {item?.children?.length > 0
        ? item.children.map((i) => {
            return <Optionsitem key={i._id} item={i} />;
          })
        : null}
    </>
  );
};

const CategoryCard = ({ item, refetch }) => {
  const removeHandler = async () => {
    const Deleteitem = await api.delete(`/category/${item?._id}`);
    if (Deleteitem.status === 200) {
      toast.success(`دسته بندی ${item.name} حذف شد`);
      refetch();
    }
  };

  return (
    <div className="border">
      <div className="bg-gray-100  px-4 py-2 flex justify-between items-center">
        <div className="flex gap-2">
          <b className="font-normal">{item.name}</b>
          <span className="text-gray-400">{item.slug}</span>
        </div>
        <div>
          <button className="flex items-center" onClick={removeHandler}>
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
      {item?.children?.length > 0 && (
        <div className="p-2 bg-white">
          {item.children.map((i) => {
            return <CategoryCard key={i._id} item={i} refetch={refetch} />;
          })}
        </div>
      )}
    </div>
  );
};
