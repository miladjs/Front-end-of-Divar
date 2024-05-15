import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import SendOtp from "./SendOtp";
import CheckOtp from "./CheckOtp";
import { regMobile } from "../../../config/regex";
import { sendOTP } from "../../../service/authService";

const Auth = () => {
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();

  useEffect(() => {
    const MobileValid = regMobile.exec(mobile);
    if ((!MobileValid && mobile.length == 11) || mobile.length > 11) {
      setErr("شماره موبایل وارد شده اشتباه است");
    } else {
      setErr(null);
    }
  }, [mobile]);

  const sendHandler = async () => {
    setErr(null);
    const { response, error } = await sendOTP(mobile);
    if (error) {
      setErr("در ارسال کد مشکلی پیش آمده");
      return;
    }
    if (response?.data) {
      const code = response?.data?.otp.split(" ")[2];
      setOtp(code);
      setStep(2);
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-[350px] ">
        <div className="flex item-center justify-between border-b pb-8 mb-8">
          <h2 className="text-[20px] font-normal">ورود به حساب کاربری</h2>
          <Link to="/">
            <IoIosArrowRoundBack className="text-[28px] text-gray-400" />
          </Link>
        </div>
        {step === 1 ? (
          <SendOtp
            setStep={setStep}
            setMobile={setMobile}
            mobile={mobile}
            setErr={setErr}
            err={err}
            sendHandler={sendHandler}
          />
        ) : (
          <CheckOtp
            setStep={setStep}
            mobile={mobile}
            sendHandler={sendHandler}
            setErr={setErr}
            err={err}
            otp={otp}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
