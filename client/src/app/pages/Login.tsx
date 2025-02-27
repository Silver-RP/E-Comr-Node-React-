import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../api/auth";
import Head from "../components/Head";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); 
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      console.log("API Response:", response);

      if (response.success === true) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("wishlist", JSON.stringify(response.wishlist));
        navigate("/");
        window.location.reload();
      } else {
        console.error("Login failed:", response.message);
        setAlertMessage(response.message); 
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
    <Head title="Login" />
    <main className="pt-60 pb-5">
      <div className="mb-4 pb-4"></div>
      <section className="login-register container" style={{ maxWidth: "500px" }}>
        <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
          <li className="" role="presentation">
            <h3>Login</h3>
          </li>
        </ul>

        {alertMessage && <p style={{ color: "red" }}>{alertMessage}</p>}

        <div className="tab-content pt-2" id="login_register_tab_content">
          <div className="tab-pane fade show active" id="tab-item-login" role="tabpanel">
            <div className="login-form">
              <form onSubmit={handleSubmitLogin} className="needs-validation" name="login-form">
                <div className="mb-3">
                  <label htmlFor="email" className="mb-2">Email address *</label>
                  <input
                    className="form-control form-control_gray"
                    name="email"
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="pb-3"></div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="mb-2">Password *</label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control_gray"
                    name="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeLowVision : faEye}
                    onClick={handleTogglePassword}
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                      color: "black",
                      position: "absolute",
                      right: "15px",
                      top: "72%",
                      transform: "translateY(-50%)",
                      zIndex: "10",
                      backgroundColor: "#fff",
                      padding: "2px",
                    }}
                  />
                </div>

                <button className="btn btn-primary bg-dark w-100 text-uppercase" type="submit">
                  Log In
                </button>

                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">No account yet?</span>
                  <Link to="/register" className="btn-text ms-2 text-black">Create Account</Link>
                  <p className="m-1 fw-bold">OR</p>
                  <span className="text-secondary">Forgot Password?</span>
                  <Link to="/forgot-password" className="btn-text ms-2 text-black">Forgot Password</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
   
  );
};

export default Login;
