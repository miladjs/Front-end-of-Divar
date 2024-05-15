import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOTP } from "../../../service/authService";
import { saveCookie } from "../../../config/cookie.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfile } from "../../../service/userService";
import { useQuery } from "@tanstack/react-query";

const CheckOtp = ({ setStep, mobile, sendHandler, setErr, err, otp }) => {
  const navigate = useNavigate();
  const [otpnew, setOtpNew] = useState();
  const [time, setTime] = useState(90);

  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const checkHandler = async () => {
    setErr(null);
    const { response } = await checkOTP(mobile, otpnew);
    if (response?.data) {
      saveCookie(response?.data);
      toast.success("با موفقیت وارد شدین");
      refetch();
      navigate("/");
    } else {
      setErr("کد وارد شده اشتباه است");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const aginSend = () => {
    sendHandler();
    setTime(90);
  };

  return (
    <div>
      <div>
        <b className="font-normal text-[20px]">کد تأیید را وارد کنید</b>
        <p className="my-4 text-gray-500 font-light">
          کد پیامک‌ شده به شمارۀ «{mobile}» را وارد کنید.
        </p>
        {err && <div className="errorbox">{err}</div>}
        <p className="mt-3 bg-orange-200 p-3 border border-orange-800 text-orange-900">
          در محیط توسعه هستیم کد در همین قسمت نمایش داده می شود کد : {otp}
        </p>
        <div dir="ltr">
          <OTPInput
            value={otpnew}
            onChange={setOtpNew}
            numInputs={5}
            containerStyle="containerotp"
            inputStyle="inputotp"
            renderSeparator={<span className="text-gray-400">-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <button
          className="text-gray-400 font-light py-2 text-right hover:text-gray-700"
          onClick={() => setStep(1)}
        >
          تغییر شماره موبایل
        </button>
      </div>
      <div className="flex items-center mt-7 ">
        <button className="btn btn-primary  " onClick={checkHandler}>
          ورود
        </button>
        {time <= 0 ? (
          <button className="btn btn-primary-border mr-3 " onClick={aginSend}>
            ارسال کد مجدد
          </button>
        ) : (
          <span className="mr-4 flex items-center text-gray-400 font-light gap-1">
            <span>{time}</span>
            <span>ثانیه ارسال مجدد کن</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CheckOtp;
