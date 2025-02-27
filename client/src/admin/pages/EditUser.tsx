import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../components/Head";
import { getUserById, updateUser } from "../../api/admin";

const EditUser = () => {
  const { userId } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
  });

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {

      try {
        if (userId) {
          const data = await getUserById(userId);
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            role: data.role || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateUser(userId ?? '', formData);
      alert(response.message);
      window.location.href = "/admin/users";
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  return (
    <>
      <Head title="Edit User" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Edit User</h3>
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
                <div className="text-tiny">Edit User</div>
              </li>
            </ul>
          </div>
          <div className="wg-box">
            <form className="form-new-product form-style-1" id="form-edit-user" onSubmit={handleSubmit}>
              <fieldset className="name">
                <div className="body-title">User Name <span className="tf-color-1">*</span></div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">Phone Number <span className="tf-color-1">*</span></div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">Email <span className="tf-color-1">*</span></div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">Role <span className="tf-color-1">*</span></div>
                <select name="role" value={formData.role} onChange={handleChange} required>
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

              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
