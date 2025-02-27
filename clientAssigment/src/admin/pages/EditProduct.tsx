import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getCategories, editProduct } from "../../api/admin";
import { fetchProduct } from "../../api/app";
import { useParams } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  id: number;
  _id: string;
  name: string;
  cateName: string;
  salePrice: number;
  price: number;
  images: string[];
  SKU: string;
  category: string;
  brand: string;
  featured: boolean;
  hot: boolean;
  stockStatus: string;
  quantity: number;
  saledQuantity: number;
  description: string;
  shortDescription: string;
  oldImages: string[];
}

const EditProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [cateId, setCateId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [SKU, setSKU] = useState("");
  const [quantity, setQuantity] = useState("");
  const [featured, setFeatured] = useState("0");
  const [hot, setHot] = useState("0");
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cateId", cateId);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("salePrice", salePrice);
    formData.append("SKU", SKU);
    formData.append("quantity", quantity);
    formData.append("featured", featured);
    formData.append("hot", hot);

    if (product && product.oldImages) {
      product.oldImages.flat().forEach((image) => {
        formData.append("oldImages", image);
      });
      
    }

    if (!id) {
      console.error("Product ID is missing");
      return;
    }


    if (newImages) {
      Array.from(newImages).forEach((file) => {
        formData.append("images", file);
      });

      // Indicate that old images should be deleted
      formData.append("deleteOldImages", "true");
    } else {
      // Keep old images if no new ones are uploaded
      oldImages.forEach((img) => formData.append("oldImages", img));
    }

    try {
        const response = await editProduct(id, formData);

        if (response) {
          alert("Product edited successfully");
          window.location.href = "/admin/products";
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const formattedOldImages = product.images.flat();
      setOldImages(formattedOldImages);

      // Convert to URLs for preview
      setImageUrls(
        formattedOldImages.map(
          (img) => `http://localhost:3000/app/assets/images/products/${img}`
        )
      );
    }
  }, [product]);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewImages(files);
      setImageUrls(Array.from(files).map((file) => URL.createObjectURL(file))); // Preview new images
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const data = await fetchProduct(id ?? "");
        setProduct(data.product);
        setCategories(response.categories);

        if (data.product) {
          setName(data.product.name || "");
          setCateId(data.product.category || "");
          setShortDescription(data.product.shortDescription || "");
          setDescription(data.product.description || "");
          setPrice(data.product.price ? data.product.price.toString() : "");
          setSalePrice(
            data.product.salePrice ? data.product.salePrice.toString() : ""
          );
          setSKU(data.product.SKU || "");
          setQuantity(
            data.product.quantity ? data.product.quantity.toString() : ""
          );
          setFeatured(data.product.featured ? "1" : "0");
          setHot(data.product.hot ? "1" : "0");

          const formattedOldImages = data.product.images.flat();
          setOldImages(formattedOldImages);

          setImageUrls(
            formattedOldImages.map(
              (img: any) => `http://localhost:3000/app/assets/images/products/${img}`
            )
          );

          const foundCategory = response.categories.find(
            (cat: any) => cat._id === data.product.cateId
          );
          setCateId(
            foundCategory
              ? foundCategory._id
              : response.categories[0]?._id || ""
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCategories();
  }, [id]);

  return (
    <>
      <Head title="Edit Product" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Edit Product</h3>
            <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
              <li>
                <a href="index-2.html">
                  <div className="text-tiny">Dashboard</div>
                </a>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <a href="all-product.html">
                  <div className="text-tiny">Products</div>
                </a>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <div className="text-tiny">Add product</div>
              </li>
            </ul>
          </div>
          <form
            className="tf-section-2 form-add-product"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleEditProduct}
          >
            {product && <input type="hidden" name="id" value={product._id} />}

            <div className="wg-box">
              <fieldset className="name">
                <div className="body-title mb-10">
                  Product name <span className="tf-color-1">*</span>
                </div>
                <input
                  className="mb-10"
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  aria-required="true"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="text-tiny">
                  Do not exceed 100 characters when entering the product name.
                </div>
              </fieldset>

              <div className="gap22 cols">
                <fieldset className="category">
                  <div className="body-title mb-10">
                    Category <span className="tf-color-1">*</span>
                  </div>
                  <div className="select">
                    <select
                      className=""
                      name="cateId"
                      value={cateId}
                      required
                      onChange={(e) => setCateId(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
              </div>

              <fieldset className="shortdescription">
                <div className="body-title mb-10">
                  Short Description <span className="tf-color-1">*</span>
                </div>
                <textarea
                  className="mb-10 ht-150"
                  name="shortDescription"
                  placeholder="Short Description"
                  aria-required="true"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                ></textarea>
                <div className="text-tiny">
                  Do not exceed 100 characters when entering the product name.
                </div>
              </fieldset>

              <fieldset className="description">
                <div className="body-title mb-10">
                  Description <span className="tf-color-1">*</span>
                </div>
                <textarea
                  className="mb-10"
                  name="description"
                  placeholder="Description"
                  aria-required="true"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="text-tiny">
                  Do not exceed 100 characters when entering the product name.
                </div>
              </fieldset>
            </div>
            <div className="wg-box">
              <fieldset>
                <div className="body-title">
                  Upload images <span className="tf-color-1">*</span>
                </div>
                <div className="upload-image flex-grow">
                  {/* Display images (either old or new) */}
                  {imageUrls.length > 0 ? (
                    imageUrls.map((img, index) => (
                      <div key={index} className="item">
                        <img
                          src={img}
                          className="effect8"
                          alt={`Preview ${index + 1}`}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}

                  {/* File Upload */}
                  <div id="upload-file" className="item up-load">
                    <label className="uploadfile" htmlFor="myFile">
                      <span className="icon">
                        <i className="icon-upload-cloud"></i>
                      </span>
                      <span className="body-text">
                        Drop your images here or{" "}
                        <span className="tf-color">click to browse</span>
                      </span>
                      <input
                        type="file"
                        id="myFile"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImagePreview}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="cols gap22">
                <fieldset className="name">
                  <div className="body-title mb-10">
                    Regular Price <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="mb-10"
                    type="number"
                    placeholder="Enter regular price"
                    name="price"
                    aria-required="true"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </fieldset>
                <fieldset className="name">
                  <div className="body-title mb-10">
                    Sale Price <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="mb-10"
                    type="number"
                    placeholder="Enter sale price"
                    name="salePrice"
                    aria-required="true"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="cols gap22">
                <fieldset className="name">
                  <div className="body-title mb-10">
                    SKU <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="mb-10"
                    type="text"
                    placeholder="Enter SKU"
                    name="SKU"
                    aria-required="true"
                    required
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  />
                </fieldset>
                <fieldset className="name">
                  <div className="body-title mb-10">
                    Quantity <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="mb-10"
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    aria-required="true"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="cols gap22">
                <fieldset className="name">
                  <div className="body-title mb-10">Featured</div>
                  <div className="select mb-10">
                    <select
                      className=""
                      name="featured"
                      onChange={(e) => setFeatured(e.target.value)}
                      value={featured}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset className="name">
                  <div className="body-title mb-10">Hot</div>
                  <div className="select mb-10">
                    <select
                      className=""
                      name="hot"
                      onChange={(e) => setHot(e.target.value)}
                      value={hot}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </fieldset>
              </div>
              <div className="cols gap10">
                <button className="tf-button w-full bg-black" type="submit">
                  Save Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
