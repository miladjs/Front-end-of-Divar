import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api, { apifile } from "../../../config/api.config";
import Loader from "../../components/Loader";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import Mapir from "mapir-react-component";

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBmMTcxZGQyNTg1OTgxNzNmM2Q4ZjI1MTJkZmJjMzZhZDIwNmY0ZDYwYTczNjBlNzUxY2U2MTNjODVmZWE4Yjc2N2VhZmI3ODQ3M2EwMTA5In0.eyJhdWQiOiIyNTkyNiIsImp0aSI6IjBmMTcxZGQyNTg1OTgxNzNmM2Q4ZjI1MTJkZmJjMzZhZDIwNmY0ZDYwYTczNjBlNzUxY2U2MTNjODVmZWE4Yjc2N2VhZmI3ODQ3M2EwMTA5IiwiaWF0IjoxNzA2Mjk2NjM2LCJuYmYiOjE3MDYyOTY2MzYsImV4cCI6MTcwODgwMjIzNiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qn-jKSq1xr1Ia8ek4OqBHBW5sQvgSmc05J5qEloji7Fs62dseH1NAepbwUgKZGS7aiLBoQP2Ev-5Q5aUted4jQ9QfPZaxMl218RQAr2wrxwuk_Bh76nlI33PwH6wtaUCVSwFEtYWJBnOp71be0lCy24Vsh3doz2xvGmq0Qzro2xzY8ApHeYL_0dMHp4YT4Vnm0_qxvWrtXAgdEqAHlDjUhGwuFD1jSQLn4ER5VV74g8ZprZ5GWEYAJkRbD81VJqN-RoORDpoRODL3-gO_VtafWaUYDldibZP6MeOmYfyx-XbxYDNwCoaPGWUdcTmOw3zFXBKKVF6ADX2c6t4G8769g",
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

const NewItem = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState();

  const [formPost, setFormPost] = useState({
    title: null,
    content: null,
    amount: null,
    lat: 35.72,
    lng: 51.33,
    images: null,
    category: null,
  });

  useEffect(() => {
    if (formPost.category) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [formPost]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="mb-4">
          <h1 className="text-[20px]">ثبت آگهی</h1>
          {formPost.category ? (
            <span className="mt-3 flex text-[15px text-gray-500 font-light">
              ثبت آگهی در دسته بندی {category.name}
            </span>
          ) : null}
        </div>
        {formPost.category ? (
          <button
            className="bg-red-100 py-3 px-4"
            onClick={() =>
              setFormPost((prev) => {
                return { ...prev, category: null };
              })
            }
          >
            تغییر دسته بندی
          </button>
        ) : null}
      </div>
      <div className="mt-3">
        {step == 1 ? (
          <StepCategory
            setFormPost={setFormPost}
            formPost={formPost}
            setCategory={setCategory}
            category={category}
          />
        ) : (
          <FormComponent formPost={formPost} setFormPost={setFormPost} />
        )}
      </div>
    </div>
  );
};

export default NewItem;

const FormComponent = ({ formPost, setFormPost }) => {
  const [coord, setCoord] = useState([56.31, 27.19]);
  const [err, setErr] = useState(null);

  const newPost = (dto) => apifile.post("post/create", dto);

  const { mutate } = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      toast.success("آگهی شما ثبت شد");
      window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (err) {
      toast.error(err);
    }

    const formData = new FormData();

    for (let i in formPost) {
      formData.append(i, formPost[i]);
    }

    mutate(formData);
  };

  useEffect(() => {
    if (!formPost.title || !formPost.content || !formPost.amount) {
      setErr("اطلاعات آگهی رو کامل کنید");
    } else if (isNaN(formPost.amount)) {
      setErr("قیمت از نوع عدد است");
    } else {
      setErr(null);
    }
  }, [formPost]);

  const changeHandler = (e) => {
    const name = e.target.name;

    if (name !== "images") {
      setFormPost((form) => {
        return { ...form, [name]: e.target.value };
      });
    } else {
      setFormPost((form) => {
        return { ...form, [name]: e.target.files[0] };
      });
    }
  };

  const mapHandler = (map, e) => {
    setCoord([e.lngLat.lng, e.lngLat.lat]);
    setFormPost((form) => {
      return { ...form, lng: e.lngLat.lng, lat: e.lngLat.lat };
    });
  };

  return (
    <div className="mt-10">
      <form
        className="grid grid-cols-[2fr_1fr] gap-10 mb-10"
        onChange={changeHandler}
        onSubmit={submitHandler}
      >
        <div className="formbox space-y-6">
          <div>
            <label htmlFor="title">عنوان</label>
            <input
              type="text"
              name="title"
              defaultValue={formPost.title}
              placeholder="عنوان آگهی"
            />
          </div>
          <div>
            <label htmlFor="amount">قیمت</label>
            <input
              type="text"
              name="amount"
              defaultValue={formPost.amount}
              placeholder="قیمت محصول"
            />
          </div>
          <div>
            <label htmlFor="content">توضیحات</label>
            <textarea
              name="content"
              defaultValue={formPost.content}
              placeholder="توضیحات آگهی"
            />
          </div>
        </div>
        <div className="images flex justify-start flex-col items-end h-full">
          <label htmlFor="fileUpload">
            <span>{formPost?.images ? `عکس انتخاب شده` : "انتخاب عکس"}</span>
            <input type="file" name="images" id="fileUpload" accept="image/*" />
          </label>
          <button type="submit" disabled={err}>
            ثبت آگهی
          </button>
        </div>
      </form>
      <div className="mb-20 flex">
        <Mapir
          Map={Map}
          center={coord}
          userLocation
          className="mapcontainer"
          onClick={mapHandler}
        >
          <Mapir.Marker
            coordinates={coord}
            anchor="bottom"
            Image={"https://map.ir/css/images/marker-default-red.svg"}
          ></Mapir.Marker>
        </Mapir>
      </div>
    </div>
  );
};

const StepCategory = ({ setFormPost, formPost, setCategory, category }) => {
  const getCategorys = () => api.get("/category");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categorys"],
    queryFn: getCategorys,
  });

  return (
    <div>
      <h2 className="text-gray-400 mt-2 font-light flex gap-2 items-center">
        {category ? (
          <button
            onClick={() => {
              setCategory(null);
              setFormPost((prev) => {
                return { ...prev, category: null };
              });
            }}
          >
            <IoIosArrowRoundBack className="text-[26px] rotate-180" />
          </button>
        ) : null}
        <span> انتخاب دسته بندی {category ? category.name : "اصلی"}</span>
      </h2>

      {isLoading ? <Loader /> : null}

      <div className="mt-8 ">
        <CategoryLoop
          data={category?.children.length > 0 ? category?.children : data?.data}
          setCategory={setCategory}
          setFormPost={setFormPost}
          formPost={formPost}
        />
      </div>
    </div>
  );
};

const CategoryLoop = ({ data, setCategory, setFormPost, formPost }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <h3
            className="border-b p-5 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            key={item._id}
            onClick={() =>
              item.children.length > 0
                ? setCategory(item)
                : setFormPost((form) => {
                    return { ...form, category: item._id };
                  })
            }
          >
            <span>{item.name}</span>
            <IoIosArrowBack />
          </h3>
        );
      })}
    </>
  );
};
