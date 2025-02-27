import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import Head from "../components/Head";

const ResetPassword = () => {
  const { token } = useParams(); // Get reset token from URL
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("text-danger");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Invalid or expired reset link.");
      return;
    }

    if (password !== password_confirmation) {
      setMessage("Passwords do not match.");
      return;
    }

    console.log("Reset Password Payload:", { token, password, password_confirmation });

    try {
      const response = await resetPassword(
        token,
        password,
        password_confirmation
      );
      if (response.success === true) {
        setMessage("Password reset successfully. Please login.");
        setMessageClass("text-success");
      } else {
        setMessage(response?.message || "Failed to reset password.");
        setMessageClass("text-danger");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <Head title="Reset Password" />

    <main className="pt-60 pb-5">
      <div className="mb-4 pb-4"></div>
      <section
        className="login-register container"
        style={{ maxWidth: "500px" }}
      >
        <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link nav-link_underscore active">
              Reset Password
            </a>
          </li>
        </ul>
        <div className="tab-content pt-2" id="login_register_tab_content">
          <div className="tab-pane fade show active">
            <div className="login-form">
              {message && <p className={messageClass}>{message}</p>}

              <form onSubmit={handleResetPassword} className="needs-validation">
                <div className="mb-3 position-relative">
                  <label htmlFor="password">New Password *</label>

                  <input
                    className="form-control form-control_gray"
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

                <div className="mb-3 position-relative">
                  <label htmlFor="password_confirmation">
                    Confirm New Password *
                  </label>

                  <input
                    className="form-control form-control_gray"
                    type={showConfirmPassword ? "text" : "password"} 
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeLowVision : faEye}
                    onClick={handleToggleConfirmPassword}
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

                <button
                  className="btn text-white bg-black w-100 text-uppercase"
                  type="submit"
                >
                  Confirm
                </button>
                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">No account yet?</span>
                  <Link
                    to="/register"
                    className="btn-text js-show-register ms-2 text-black"
                  >
                    Create Account
                  </Link>{" "}
                  |{" "}
                  <Link
                    to="/login"
                    className="btn-text js-show-register text-black"
                  >
                    Login
                  </Link>
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

export default ResetPassword;
