import { addUser } from "../../api/admin";
import Head from "../components/Head";
import { useState } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert("Password and confirm password do not match");
      return;
    }

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await addUser({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: formData.role,
      });

      console.log(response);
      alert(response.message || "User added successfully.");
      window.location.href = "/admin/users";

    } catch (error: any) {
      console.error("Error adding user:", error);

        const errorMessage = error.response?.data?.message || "Failed to add user.";
        alert(errorMessage);
    }
  };

  return (
    <>
      <Head title="Add User" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Add User</h3>
            <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
              <li>
                <a href="#">
                  <div className="text-tiny">Dashboard</div>
                </a>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <a href="#">
                  <div className="text-tiny">User</div>
                </a>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <div className="text-tiny">New User</div>
              </li>
            </ul>
          </div>
          <div className="wg-box">
            <form className="form-new-product form-style-1" id="form-add-user" onSubmit={handleAddUser}>
              <fieldset>
                <div className="body-title">User Name <span className="text-danger">*</span></div>
                <input className="flex-grow" type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
              </fieldset>

              <fieldset>
                <div className="body-title">Phone Number <span className="text-danger">*</span></div>
                <input className="flex-grow" type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
              </fieldset>

              <fieldset>
                <div className="body-title">Email <span className="text-danger">*</span></div>
                <input className="flex-grow" type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required />
              </fieldset>

              <fieldset>
                <div className="body-title">Password <span className="text-danger">*</span></div>
                <input className="flex-grow" type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
              </fieldset>

              <fieldset>
                <div className="body-title">Confirm Password <span className="text-danger">*</span></div>
                <input className="flex-grow" type="password" name="password_confirmation" placeholder="Re-enter password" value={formData.password_confirmation} onChange={handleChange} required />
              </fieldset>

              <fieldset>
                <div className="body-title">Role <span className="text-danger">*</span></div>
                <select className="flex-grow" name="role" value={formData.role} onChange={handleChange} required>
                  <option value="" disabled>Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </fieldset>
              <fieldset>
                <div className="body-title"></div>
                <div className="bot ">
                <button className="tf-button w208" type="submit">Save</button>
              </div>
              </fieldset>

              {/* <div className="bot ">
                <button className="tf-button w208" type="submit">Save</button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
