import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getUsers, blockUser } from "../../api/admin";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../app/components/common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

interface User {
  id: number;
  _id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  avatar: string;
  blocked: boolean;
  numberOfOrders: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 2,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sort = searchParams.get("sort") || "default";
    const fetchUsers = async () => {
      try {
        const response = await getUsers(page, sort);
        setUsers(response.users);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchParams]);

  const handleBlockUser = async (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    try {
      const response = await blockUser(userId);
      if (response) {
        const updatedUsers = await getUsers(pagination.currentPage, "default");
        setUsers(updatedUsers.users);
        alert(response.message);
      }
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  return (
    <>
      <Head title="Users" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Users</h3>
            <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
              <li>
                <a href="index.html">
                  <div className="text-tiny">Dashboard</div>
                </a>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <div className="text-tiny">All Users</div>
              </li>
            </ul>
          </div>

          <div className="wg-box">
            <div className="flex items-center justify-between gap10 flex-wrap">
              <div className="wg-filter flex-grow">
                <form className="form-search">
                  <fieldset className="name">
                    <input
                      type="text"
                      placeholder="Search here..."
                      className=""
                      name="name"
                      required
                    />
                  </fieldset>
                  <div className="button-submit">
                    <button className="" type="submit">
                      <i className="icon-search"></i>
                    </button>
                  </div>
                </form>
                <div></div>
              </div>
              <Link className="tf-button style-1 w208" to="/admin/add-user">
                <i className="icon-plus"></i>
                Add User
              </Link>
            </div>

            <div className="wg-table table-all-user">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="fs-5">#</th>
                      <th className="fs-5">User</th>
                      <th className="fs-5">Phone</th>
                      <th className="fs-5">Email</th>
                      <th className="text-center fs-5">Total Orders</th>
                      <th className=" fs-5">Blocked</th>
                      <th className="fs-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td className="pname">
                            <div className="image">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="image"
                              />
                            </div>
                            <div className="name">
                              <a href="#" className="body-title-2">
                                {user.name}
                              </a>
                            </div>
                          </td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            <a href="#" target="_blank">
                              {user.totalOrders? user.totalOrders: 0}
                            </a>
                          </td>
                          <td>{user.blocked? (
                            <span className="bg-danger rounded-3 p-2 text-white">Blocked</span>
                          ):(
                            <span className="bg-success rounded-3 p-2 text-white">Active</span>
                          )}</td>
                          <td>
                            <div className="list-icon-function">
                              <Link to={`/admin/edit-user/${user._id}`}>
                                <div className="item edit">
                                  <i className="icon-edit-3"></i>
                                </div>
                              </Link>
                              <FontAwesomeIcon
                                icon={faBan}
                                className="text-danger cursor-pointer"
                                onClick={(e) => {
                                  handleBlockUser(e, user._id);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="divider"></div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => {
                setSearchParams({
                  page: newPage.toString(),
                  sort: searchParams.get("sort") || "default",
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
