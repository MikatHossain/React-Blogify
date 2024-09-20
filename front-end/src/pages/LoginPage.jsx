import { Link } from "react-router-dom";
import LoginImage from "../assets/login.png";
import LoginForm from "../components/auth/LoginForm";
const LoginPage = () => {
  return (
    <main>
      <section className="container  sm:flex sm:items-center sm:gap-8">
        <div>
          <img
            src={LoginImage}
            className="w-[500px] rounded-md"
            alt="Login image"
          />
        </div>
        <div className="w-full  md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <LoginForm />
          <p className="text-center text-xl">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 tracking-wider font-roboto  underline "
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
