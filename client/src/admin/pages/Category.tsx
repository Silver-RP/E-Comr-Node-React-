import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getCategories, deleteCategory } from "../../api/admin";
import { Link, useSearchParams } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
  
    try {
      const response = await deleteCategory(id);
      
      if (response.status === 500) {
        alert(response.data.message); 
        return;
      }
  
      alert("Category deleted successfully!");
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
    } catch (error: any) {
      console.error("Error deleting category:", error);
  
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while deleting the category.");
      }
    }
  };
  

  return (
    <>
      <Head title="Category" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Categories</h3>
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
                <div className="text-tiny">Categories</div>
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
                </form>
              </div>
              <Link className="tf-button style-1 w208" to="/admin/add-category">
                <i className="icon-plus"></i>Add new
              </Link>
            </div>
            <div className="wg-table table-all-user">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="fs-5">#</th>
                    <th className="fs-5">Name</th>
                    <th className="fs-5">Slug</th>
                    <th className="fs-5">Products</th>
                    <th className="fs-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td className="pname">
                        <div className="image">
                          <img
                            src={`http://localhost:3000/app/assets/images/home/demo3/${category.image}`}
                            alt={category.name}
                            className="image"
                          />
                        </div>
                        <div className="name">
                          <Link to="#" className="body-title-2">
                            {category.name}
                          </Link>
                        </div>
                      </td>
                      <td>{category.slug}</td>
                      <td>{category.productCount}</td>
                      <td>
                        <div className="list-icon-function">
                          <Link to={`/admin/edit-category/${category._id}`}>
                            <div className="item edit">
                              <i className="icon-edit-3"></i>
                            </div>
                          </Link>

                          <div
                            className="item text-danger delete"
                            typeof="button"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <i className="icon-trash-2"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
