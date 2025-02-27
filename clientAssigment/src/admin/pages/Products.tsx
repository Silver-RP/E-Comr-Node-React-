import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getShopProducts } from "../../api/app";
import { deleteProduct } from "../../api/admin";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../app/components/common/Pagination";
// import Pagination from "../components/common/Pagination";

interface Product {
  id: number;
  _id: string;
  name: string;
  cateName: string;
  salePrice: number;
  price: number;
  images: string[];
  sku: string;
  category: string;
  brand: string;
  featured: boolean;
  stockStatus: string;
  quantity: number;
  saledQuantity: number;
  description: string;
}

interface Category {
  _id: string;
  name: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    const fetchProducts = async () => {
      const page = parseInt(searchParams.get("page") || "1", 10);
      const sort = searchParams.get("sort") || "default";

      try {
        const response = await getShopProducts(page, sort);
        console.log("Products:", response.products);
        setProducts(response.products);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const result = await deleteProduct(productId);

        if (result.success) {
          alert("Product deleted successfully!");
          window.location.reload();
        } else {
          alert(result.message || "Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An unexpected error occurred while deleting the product.");
      }
    }
  };

  return (
    <>
      <Head title="Products" />

      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>All Products</h3>
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
                <div className="text-tiny">All Products</div>
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
              </div>
              <Link className="tf-button style-1 w208" to="/admin/add-product">
                <i className="icon-plus"></i>Add new
              </Link>
            </div>
            <div>
              <form method="GET" action="/admin/products" id="sort-form">
                <select
                  className="fs-5 shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
                  aria-label="Sort Items"
                  name="sort"
                  id="sort-select"
                >
                  <option value="default" selected>
                    Default Sorting
                  </option>
                  <option value="featured">Featured</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </form>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr className="fs-3">
                    <th className="fs-4">#</th>
                    <th className="fs-4">Name</th>
                    <th className="fs-4">Price</th>
                    <th className="fs-4">Sale Price</th>
                    <th className="fs-4">Category</th>
                    <th className="fs-4">Featured</th>
                    <th className="fs-4">Quantity</th>
                    <th className="fs-4">Saled Quantity</th>
                    <th className="fs-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td className="pname">
                          <div className="image">
                            <img
                              src={`http://localhost:3000/app/assets/images/products/${product.images[0]}`}
                              alt={product.name}
                              className="image"
                            />
                          </div>
                          <div className="name">
                            <a href="#" className="body-title-2">
                              {product.name}
                            </a>
                          </div>
                        </td>
                        <td>${product.price}</td>
                        <td>${product.salePrice}</td>
                        <td>{product.cateName}</td>
                        <td>{product.featured ? "Yes" : "No"}</td>
                        <td>{product.quantity}</td>
                        <td>{product.saledQuantity}</td>
                        <td>
                          <div className="list-icon-function">
                            <a href="#" target="_blank">
                              <div className="item eye">
                                <i className="icon-eye"></i>
                              </div>
                            </a>
                            <Link to={`/admin/edit-product/${product._id}`}>
                              <div className="item edit">
                                <i className="icon-edit-3"></i>
                              </div>
                            </Link>
                            <div
                              className="item text-danger delete"
                              onClick={() => handleDelete(product._id)}
                            >
                              <i className="icon-trash-2"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default Product;
