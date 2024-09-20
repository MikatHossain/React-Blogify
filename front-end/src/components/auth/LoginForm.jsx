import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/auth/authAPI";

import { loginInputValidation } from "../../utility/InputValidations";
import { showToast } from "../../utility/toast";
import Input from "./Input";

const LoginForm = () => {
  const [loginUser, { data, isError, error: responseError }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginInputValidation),
  });

  useEffect(() => {
    if (responseError?.data) {
      setError("root.random", {
        type: "random",
        message: `${responseError.data.error}`,
      });
    }
    if (data?.token && data?.user) {
      showToast("successfully Login", "success");
      navigate("/");
    }
  }, [data?.token, data?.user, navigate, setError, responseError]);

  const submitLoginForm = (data) => {
    loginUser(data);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {isError && (
        <h2 className="text-red-300 text-xl">
          {errors?.root?.random?.message || "Failed to login"}
        </h2>
      )}
      <form onSubmit={handleSubmit(submitLoginForm)}>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors?.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors?.password?.message}
        />

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
