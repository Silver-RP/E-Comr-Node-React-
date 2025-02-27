import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailRequest } from "../../api/auth";
import Head from "../components/Head";


const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) return;

      try {
        const response = await verifyEmailRequest(token);
        if (response?.success) {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 5000);
        } else {
          setMessage(response?.message || "Invalid or expired token.");
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyUserEmail();
  }, [token, navigate]);

  return (
    <>
      <Head title="Verify Email" />
      <main className="pt-60 pb-5">
        <div className="mb-4 pb-4"></div>
        <section
          className="login-register container"
          style={{ maxWidth: "500px" }}
        >
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="" role="presentation">
              <h3>Verify Email</h3>
            </li>
          </ul>


          <div className="tab-content pt-2" id="login_register_tab_content">
            <div
              className="tab-pane fade show active"
              id="tab-item-login"
              role="tabpanel"
            >
               <div>{message}</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default VerifyEmail;
