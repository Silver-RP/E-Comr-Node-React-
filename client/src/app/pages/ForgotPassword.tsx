import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import Head from "../components/Head";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState(""); 

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setMessage("Please wait...");
  
    try {
      const response = await forgotPassword(email);
      if (response.success === true) {
        setMessage("A reset password link has been sent to your email.");
        setMessageClass("text-success");
      } else {
        setMessage(response?.message || "Failed to send email.");
        setMessageClass("text-danger");
      }
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <>
    <Head title="Forgot Password" />
    <main className="pt-60 pb-5">
      <div className="mb-4 pb-4"></div>
      <section className="login-register container" style={{ maxWidth: "500px" }}>
        <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore active"
              id="login-tab"
              data-bs-toggle="tab"
              href="#tab-item-login"
              role="tab"
              aria-controls="tab-item-login"
              aria-selected="true"
            >
              Forgot Password
            </a>
          </li>
        </ul>
        <div className="tab-content pt-2" id="login_register_tab_content">
          <div
            className="tab-pane fade show active"
            id="tab-item-login"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <div className="login-form">
            {message && <p className={messageClass}>{message}</p>} 

              <form onSubmit={handleForgotPassword} className="needs-validation">
                <label htmlFor="email">Email address *</label>
                <div className="mb-3">
                  <input
                    className="form-control form-control_gray"
                    type="email"
                    name="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <button className="btn text-white bg-black w-100 text-uppercase" type="submit">
                  Confirm
                </button>
                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">No account yet?</span>
                  <Link to="/register" className="btn-text js-show-register ms-2 text-black">
                    Create Account
                  </Link>{" "}
                  |{" "}
                  <Link to="/login" className="btn-text js-show-register text-black">
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

export default ForgotPassword;
