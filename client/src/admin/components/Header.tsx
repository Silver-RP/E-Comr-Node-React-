import { Link } from "react-router-dom";
import { logoutUser } from "../../api/auth";


const Header = () => {
  const handleLogout = async () => {
    try {
        const response = await logoutUser(); 
        if (response?.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("wishlist");
            window.location.href = "/login"; 
        } else {
            console.error("Error logging out:", response?.message);
            alert("Error logging out: " + response?.message);
        }
    } catch (error) {
        console.error("Unexpected error during logout:", error);
        alert("An unexpected error occurred. Please try again.");
    }
};
  return (
    <div className="header-dashboard">
      <div className="wrap">
        <div className="header-left">
          <a href="index-2.html">
            <img
              className=""
              id="logo_header_mobile"
              alt=""
              src={"http://localhost:3000/app/assets/images/logo-clothes.png"}
              
            />
          </a>
          <div className="button-show-hide">
            <i className="icon-menu-left"></i>
          </div>

          <form className="form-search flex-grow">
            <fieldset className="name">
              <input
                type="text"
                placeholder="Search here..."
                className="show-search"
                name="name"
                value=""
                aria-required="true"
                required
              />
            </fieldset>
            <div className="button-submit">
              <button className="" type="submit">
                <i className="icon-search"></i>
              </button>
            </div>
            <div className="box-content-search" id="box-content-search">
              <ul className="mb-24">
                <li className="mb-14">
                  <div className="body-title">Top selling product</div>
                </li>
                <li className="mb-14">
                  <div className="divider"></div>
                </li>
                <li>
                  <ul>
                    <li className="product-item gap14 mb-10">
                      <div className="image no-bg">
                        <img src="images/products/17.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Dog Food Rachael Ray Nutrish®
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="mb-10">
                      <div className="divider"></div>
                    </li>
                    <li className="product-item gap14 mb-10">
                      <div className="image no-bg">
                        <img src="images/products/18.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Natural Dog Food Healthy Dog Food
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="mb-10">
                      <div className="divider"></div>
                    </li>
                    <li className="product-item gap14">
                      <div className="image no-bg">
                        <img src="images/products/19.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Freshpet Healthy Dog Food and Cat
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="">
                <li className="mb-14">
                  <div className="body-title">Order product</div>
                </li>
                <li className="mb-14">
                  <div className="divider"></div>
                </li>
                <li>
                  <ul>
                    <li className="product-item gap14 mb-10">
                      <div className="image no-bg">
                        <img src="images/products/20.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Sojos Crunchy Natural Grain Free...
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="mb-10">
                      <div className="divider"></div>
                    </li>
                    <li className="product-item gap14 mb-10">
                      <div className="image no-bg">
                        <img src="images/products/21.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Kristin Watson
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="mb-10">
                      <div className="divider"></div>
                    </li>
                    <li className="product-item gap14 mb-10">
                      <div className="image no-bg">
                        <img src="images/products/22.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Mega Pumpkin Bone
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="mb-10">
                      <div className="divider"></div>
                    </li>
                    <li className="product-item gap14">
                      <div className="image no-bg">
                        <img src="images/products/23.png" alt="" />
                      </div>
                      <div className="flex items-center justify-between gap20 flex-grow">
                        <div className="name">
                          <a href="product-list.html" className="body-text">
                            Mega Pumpkin Bone
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div className="header-grid">
          <div className="popup-wrap message type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-item">
                  <span className="text-tiny">1</span>
                  <i className="icon-bell"></i>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <h6>Notifications</h6>
                </li>
                <li>
                  <div className="message-item item-1">
                    <div className="image">
                      <i className="icon-noti-1"></i>
                    </div>
                    <div>
                      <div className="body-title-2">Discount available</div>
                      <div className="text-tiny">
                        Morbi sapien massa, ultricies at rhoncus at, ullamcorper
                        nec diam
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-2">
                    <div className="image">
                      <i className="icon-noti-2"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Account has been verified
                      </div>
                      <div className="text-tiny">
                        Mauris libero ex, iaculis vitae rhoncus et
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-3">
                    <div className="image">
                      <i className="icon-noti-3"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Order shipped successfully
                      </div>
                      <div className="text-tiny">
                        Integer aliquam eros nec sollicitudin sollicitudin
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-4">
                    <div className="image">
                      <i className="icon-noti-4"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Order pending: <span>ID 305830</span>
                      </div>
                      <div className="text-tiny">
                        Ultricies at rhoncus at ullamcorper
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="tf-button w-full">
                    View all
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="popup-wrap user type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-user wg-user">
                  <span className="image">
                    <img  src={"http://localhost:3000/app/assets/images/na8.jpeg"} alt="" />
                  </span>
                  <span className="flex flex-column">
                    <span className="body-title mb-2">Ken Silver</span>
                    <span className="text-tiny">Admin</span>
                  </span>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton3"
              >
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-user"></i>
                    </div>
                    <div className="body-title-2">Account</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-mail"></i>
                    </div>
                    <div className="body-title-2">Inbox</div>
                    <div className="number">27</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-file-text"></i>
                    </div>
                    <div className="body-title-2">Taskboard</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-headphones"></i>
                    </div>
                    <div className="body-title-2">Support</div>
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="user-item btn btn-logout" style={{ width:"100px"}}>
                    <div className="icon">
                      <i className="icon-log-out"></i>
                    </div>
                    <div className="body-title-2">Log out</div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
