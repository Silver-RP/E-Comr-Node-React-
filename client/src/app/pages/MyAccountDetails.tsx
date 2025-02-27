import { useState } from "react";
import Head from "../components/Head";
import MyAccountSidebar from "../components/common/MyAccountSidebar";
import { changeUserInfo } from "../../api/user";
import { useNotification } from "../../context/NotificationContext";


const MyAccountDetails = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const { showNotification } = useNotification() as unknown as { showNotification: (message: string) => void };


  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await changeUserInfo(formData);
      console.log("data: ", response )

      if (response?.success) {
        showNotification(response?.message || "User information updated successfully!")
        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      } else {
        alert(response?.message || "Failed to update user info.");
      }

    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };


  return (
    <>
      <Head title="My Account Details" />
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">My Account</h2>
          <div className="row">
            <MyAccountSidebar />
            <div className="col-lg-9">
              <div className="page-content my-account__edit">
                <div className="my-account__edit-form">
                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="phone">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            value={user?.email || ""}
                            readOnly
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <h5 className="text-uppercase mb-0">Password Change</h5>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="password">Old Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="new_password">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <label htmlFor="new_password_confirmation">Confirm New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="new_password_confirmation"
                            value={formData.new_password_confirmation}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="my-3">
                          <button type="submit" className="btn btn-primary bg-black">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyAccountDetails;
