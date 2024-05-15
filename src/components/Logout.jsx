import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);

  useEffect(() => {
    document.cookie = null;
    setInterval(() => {
      document.cookie = `refreshToken="" ; max-age=0`;
      document.cookie = `accessToken=""; max-age=0`;
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  if (time <= 0) {
    document.cookie = `refreshToken="" ; max-age=0`;
    document.cookie = `accessToken=""; max-age=0`;
    document.cookie = null;
    navigate("/");
    window.location.reload();
    return;
  }

  return (
    <div className="flex items-center justify-center flex-col mt-14">
      <h2 className="text-[18px]">خروج از حساب کاربری</h2>
      <div className="text-[26px] mt-4 flex gap-2">
        <b>{time}</b>
        <span>ثانیه دیگر</span>
      </div>
    </div>
  );
};

export default Logout;
