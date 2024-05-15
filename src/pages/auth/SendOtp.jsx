const SendOtp = ({ setMobile, mobile, err, sendHandler }) => {
  return (
    <div>
      <div>
        <b className="font-normal text-[20px]">
          شمارهٔ موبایل خود را وارد کنید
        </b>
        <p className="my-4 text-gray-500 font-light">
          برای استفاده از امکانات دیوار لطفاً شمارهٔ موبایل خود را وارد کنید. کد
          تأیید به این شماره پیامک خواهد شد.
        </p>
        {err && <div className="errorbox">{err}</div>}

        <input
          type="tel"
          value={mobile}
          onChange={() => setMobile(event.target.value)}
          placeholder="شماره موبایل"
          className={`inputbox w-full py-2 px-4 placeholder:text-right my-2 mt-4 text-[18px] ${
            err && "border-red-700 outline-red-800 text-red-800"
          }`}
        />
        <p className="text-gray-400 font-light py-2 text-right text-[14x]">
          شرایط استفاده از خدمات و حریم خصوصی دیوار را می‌پذیرم.
        </p>
      </div>
      <button onClick={sendHandler} className="btn btn-primary mt-7 w-full">
        تایید
      </button>
      <p className="mt-7 bg-gray-200 p-3 border border-gray-800 text-gray-900 text-center text-[15px]">
        برای ورود به بخش مدیریت سایت از شماره <b>....</b> استفاده کنید
      </p>
    </div>
  );
};

export default SendOtp;
