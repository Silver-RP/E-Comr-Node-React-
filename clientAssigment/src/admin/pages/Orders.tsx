import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getOrders } from "../../api/admin"; 
import { Link } from "react-router-dom";

interface Order {
  _id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    _id: string;
  }[];
  shippingInfo: {
    name: string;
    phone: string;
    city: string;
    address: string;
    addressDetails: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  shippingFee: number;
  totalAmount: number;
  totalOrderValue: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
}


const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(); 
        setOrders(response.data.orders); 
        console.log(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const subtotal = orders.reduce((acc, order) => acc + order.totalOrderValue, 0);

  return (
    <>
      <Head title="Orders" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Orders</h3>
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
                <div className="text-tiny">Orders</div>
              </li>
            </ul>
          </div>

          <div className="wg-box">
            <div className="flex items-center justify-between gap10 flex-wrap">
              <div className="wg-filter flex-grow">
                <form className="form-search">
                  <fieldset className="name">
                    <input type="text" placeholder="Search here..." name="name" required />
                  </fieldset>
                  <div className="button-submit">
                    <button type="submit">
                      <i className="icon-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="wg-table table-all-user">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: "70px" }} className="text-center fs-5">OrderNo</th>
                      <th className="text-center fs-5">Name</th>
                      <th className="text-center fs-5">Phone</th>
                      <th className="text-center fs-5">Subtotal</th>
                      <th className="text-center fs-5">Tax</th>
                      <th className="text-center fs-5">Total</th>
                      <th className="text-center fs-5">Status</th>
                      <th className="text-center fs-5">Order Date</th>
                      <th className="text-center fs-5">Total Items</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={order._id}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{order.shippingInfo.name}</td>
                          <td className="text-center">{order.shippingInfo.phone}</td>
                          <td className="text-center">${subtotal}</td>
                          <td className="text-center">${order.shippingMethod}</td>
                          <td className="text-center">${order.totalOrderValue}</td>
                          <td className="text-center">{order.status}</td>
                          <td className="text-center">{order.createdAt}</td>
                          <td className="text-center">{order.totalAmount}</td>
                          <td className="text-center">
                            <Link to={`/admin/order-details/${order._id}`}>
                              <div className="list-icon-function view-icon">
                                <div className="item eye">
                                  <i className="icon-eye"></i>
                                </div>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
