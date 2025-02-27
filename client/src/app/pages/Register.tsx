import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../api/auth";
import Head from "../components/Head";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [mesageClass, setMessageClass] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmitRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAlertMessage("Please wait...");

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setMessageClass("text-danger");
      return;
    }

    try {
      const response = await registerUser({ name, phone, email, password, password_confirmation: confirmPassword });

      console.log("Register Payload:", { name, phone, email, password, password_confirmation: confirmPassword });
      console.log("Register Response:", response);
      if (response.success === true) {

        setAlertMessage(response.message);
        setMessageClass("text-success");
        setTimeout(() => {
          navigate("/login");
        }, 5000);

      } else {
        setAlertMessage(response.message || "Registration failed");
        setMessageClass("text-danger");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Something went wrong!");
      setMessageClass("text-danger");
    }
  };

  return (
    <>
    <Head title="Register" />

      <main className="pt-60 pb-5">
        <div className="mb-4 pb-4"></div>
        <section className="login-register container" style={{ maxWidth: "500px" }}>
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <h3>Register</h3>
            </li>
          </ul>

          {alertMessage && <p className={mesageClass}>{alertMessage}</p>}

          <div className="tab-content pt-2" id="login_register_tab_content">
            <div className="tab-pane fade show active" id="tab-item-register" role="tabpanel" aria-labelledby="register-tab">
              <div className="register-form">
                <form onSubmit={handleSubmitRegister} className="needs-validation">
                  <label htmlFor="name" className="mb-2">Name <span className="text-danger">*</span></label>
                  <div className="mb-3">
                    <input
                      className="form-control form-control_gray"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <label htmlFor="email" className="mb-2">Email address <span className="text-danger">*</span></label>
                  <div className="mb-3">
                    <input
                      id="email"
                      type="email"
                      className="form-control form-control_gray"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <label htmlFor="mobile" className="mb-2">Mobile <span className="text-danger">*</span></label>
                  <div className="mb-3">
                    <input
                      id="mobile"
                      type="text"
                      className="form-control form-control_gray"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <label htmlFor="password" className="mb-2">Password <span className="text-danger">*</span></label>
                  <div className="mb-3 position-relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control_gray"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeLowVision : faEye}
                      onClick={handleTogglePassword}
                      className="position-absolute"
                      style={{
                        cursor: "pointer",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "black",
                        backgroundColor: "#fff",
                        padding: "2px",
                      }}
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <label htmlFor="password-confirm" className="mb-2">Confirm Password <span className="text-danger">*</span></label>
                  <div className="mb-3 position-relative">
                    <input
                      id="password-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control form-control_gray"
                      name="password_confirmation"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeLowVision : faEye}
                      onClick={handleToggleConfirmPassword}
                      className="position-absolute"
                      style={{
                        cursor: "pointer",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "black",
                        backgroundColor: "#fff",
                        padding: "2px",
                      }}
                    />
                  </div>

                  <button className="btn bg-black text-white w-100 text-uppercase" type="submit">
                    Register
                  </button>

                  <div className="customer-option mt-4 text-center">
                    <span className="text-secondary">Have an account?</span>
                    <Link to="/login" className="btn-text js-show-register ms-2 text-black">
                      Login to your Account
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

export default Register;
