import { useForm } from "react-hook-form";

import Input from "./Input";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../features/auth/authAPI";
import { registerInputValidation } from "../../utility/InputValidations";
import { showToast } from "../../utility/toast";

const RegistrationForm = () => {
  const [signUp, { data, isError, isLoading, error: responseError }] =
    useSignUpMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(registerInputValidation),
  });

  useEffect(() => {
    if (responseError?.data) {
      setError("root.random", {
        type: "random",
        message: `${responseError.data.error}`,
      });
    }
    if (data?.token && data?.user) {
      showToast("Registration successful!", "success");
      navigate("/login");
    }
  }, [data?.token, data?.user, navigate, responseError, setError]);

  const submitRegister = async (data) => {
    await signUp(data);
  };

  return (
    <>
      <div>
        {isError && (
          <h2 className="text-red-600">
            {errors?.root?.random?.message || "something wrong!"}
          </h2>
        )}
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(submitRegister)}>
        <Input
          label="First Name"
          {...register("firstName")}
          error={errors?.firstName?.message}
        />

        <Input
          label="Last Name"
          {...register("lastName")}
          error={errors?.lastName?.message}
        />
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
            className="w-full  bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
