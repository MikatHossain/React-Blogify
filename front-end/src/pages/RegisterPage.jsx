import { Link } from "react-router-dom";
import SignUpImage from "../assets/signup.png";
import RegistrationForm from "../components/auth/RegistrationForm";
const RegisterPage = () => {
  return (
    <main>
      <section className="container sm:flex items-center">
        <div className="">
          <img
            src={SignUpImage}
            alt="signup image"
            className="w-[500px] rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <RegistrationForm />

          <p className="text-center text-xl">
            Already have account?{" "}
            <Link to="/login" className="text-indigo-600 text-2xl underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
