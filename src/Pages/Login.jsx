import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
const Login = () => {
  const { signInUser, setLoading, createUserGoogle, updateUser, setUser } =
    use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signInUser(email, password)
      .then(() => {
        toast.success("Login Successfully");
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      })
      .catch((error) => {
        toast.error(error.code || "Login failed");
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    createUserGoogle()
      .then((result) => {
        const user = result.user;
        const name = user.displayName || "Google User";
        const photo = user.photoURL || "";
        const email = user.email;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: photo,
              email: email,
            });
            setLoading(false);
            navigate(location.state?.from || "/", { replace: true });
          })
          .catch(() => {
            // console.error("Error updating Google login profile:", err);
            setUser({
              ...user,
              displayName: name,
              photoURL: photo,
              email: email,
            });
            setLoading(false);
            navigate(location.state?.from?.pathname || "/", { replace: true });
          });
      })
      .catch(() => {
        // console.error("Google login failed:", err);
        setLoading(false);
      });
  };

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center space-y-3 my-16">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">Welcome Back!</h2>
        <p className="text-gray-600">
          We’re glad to see you back at{" "}
          <span className="font-bold text-[#0a472e]">EcoFridge</span>!
        </p>
        <button onClick={handleGoogleLogin} className="btn">
          <FcGoogle size={20} /> Login with Google
        </button>
        <br />
        <div className="divider">OR</div>
      </div>
      <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto px-4">
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="useremail"
              className="input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="userpassword"
              className="input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="button"
              // onClick={() => {
              //   const email = prompt("Enter your registered email:");
              //   if (email) {
              //     resetPassword(email)
              //       .then(() => toast.success("Password reset email sent!"))
              //       .catch((err) => toast.error(err.message))
              //       .finally(() => setLoading(false));
              //   }
              // }}
              className="text-sm text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-xs">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#a8b324] to-[#0a472e] hover:from-[#0a472e] hover:to-[#a8b324] text-white font-semibold rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
          >
            <FaSignInAlt /> Login
          </button>

          <p className="text-center">
            Don't Have An account ?{" "}
            <Link className="font-semibold " to="/auth/register">
              Register
            </Link>{" "}
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
