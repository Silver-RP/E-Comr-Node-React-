import Head from "../components/Head";
import MyAccountSidebar from "../components/common/MyAccountSidebar";

const MyAccount = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  return (
    <>
    <Head title="My Account" />

      <main className="">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">My Account</h2>
          <div className="row">
            <MyAccountSidebar />
            <div className="col-lg-9">
              <div className="page-content my-account__dashboard">
                <p>
                  Hello <strong className="fs-4"> {user.name}</strong>
                </p>
                <p>
                  From your account dashboard you can view your{" "}
                  <a className="unerline-link" href="account_orders.html">
                    recent orders
                  </a>
                  , manage your{" "}
                  <a className="unerline-link" href="account_edit_address.html">
                    shipping addresses
                  </a>
                  , and{" "}
                  <a className="unerline-link" href="account_edit.html">
                    edit your password and account details.
                  </a>
                </p>
              </div>
            MyAccountSidebar</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyAccount;
