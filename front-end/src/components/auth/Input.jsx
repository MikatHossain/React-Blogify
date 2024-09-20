import React from "react";

const Input = ({ label, type = "text", error, ...rest }, ref) => {
  return (
    <div className="mb-6">
      <label htmlFor={label} className="block mb-2">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        id={label}
        {...rest}
        className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
      />
      <p className="text-red-600 text-xl mt-2">{error}</p>
    </div>
  );
};

const forwardedInput = React.forwardRef(Input);
export default forwardedInput;
