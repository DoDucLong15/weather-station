//@ts-check
import toast from "react-hot-toast";
import { authEndpoint } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const { SIGNUP_API, LOGIN_API } = authEndpoint;

// ================ sign Up ================
export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      if (!response.data) {
        toast.error('Signup failed');
        throw new Error('Signup failed');
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR --> ", error);
      toast.error(error?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ================ Login ================
export function login(email, password, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data) {
        throw new Error('Login failed')
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data?.access_token))

      dispatch(setUser({ ...response.data }));
      localStorage.setItem("token", JSON.stringify(response.data?.access_token));
      localStorage.setItem("user", JSON.stringify({ ...response.data }));

      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR.......", error)
      toast.error(error?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}