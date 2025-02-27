import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../components/Head";
import { editCategory, getCategoryById } from "../../api/admin";

const EditCategory = () => {
  const { id: categoryId } = useParams(); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [image, setImage] = useState<string>(""); 

  console.log("Hello: ", categoryId); 

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return; 
    
      try {
        const response = await getCategoryById(categoryId);
        
        if (response.success && response.category) {
          setName(response.category.name);
          setSlug(response.category.slug);
          setImage(response.category.image);
        }
    
        console.log("Fetched Category:", response.category);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    

    fetchCategory();
  }, [categoryId]); 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const category = new FormData();
    category.append("name", name);
    category.append("slug", slug);
    category.append("categoryId", categoryId || "");

    if (imageFile) {
      category.append("image", imageFile);
    }

    try {
      const response = await editCategory(categoryId || "", category as unknown as { name: string });
      if (response.success) {
        alert("Category edited successfully.");
        window.location.href = "/admin/categories";
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };


  return (
    <>
      <Head title="Edit Category" />
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Category Information</h3>
          </div>
          <div className="wg-box">
            <form className="form-new-product form-style-1" onSubmit={handleSubmit}>
              <fieldset className="name">
                <div className="body-title">
                  Category Name <span className="tf-color-1">*</span>
                </div>
                <input
                  className="flex-grow"
                  type="text"
                  placeholder="Category name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </fieldset>
              <fieldset className="name">
                <div className="body-title">
                  Category Slug <span className="tf-color-1">*</span>
                </div>
                <input
                  className="flex-grow"
                  type="text"
                  placeholder="Category Slug"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <div className="body-title">
                  Upload Image <span className="tf-color-1">*</span>
                </div>
                <div className="upload-image flex-grow">
                  {image && !previewImage && (
                    <img src={`http://localhost:3000/app/assets/images/home/demo3/${image}`} alt="Current" style={{ maxWidth: "200px", borderRadius: "10px" }} />
                  )}
                  {previewImage && (
                    <img src={previewImage} className="effect8" alt="Preview" style={{ maxWidth: "200px", borderRadius: "10px" }} />
                  )}
                  <div id="upload-file" className="item up-load">
                    <label className="uploadfile" htmlFor="myFile">
                      <span className="icon"><i className="icon-upload-cloud"></i></span>
                      <span className="body-text">
                        Drop your images here or select{" "}
                        <span className="tf-color">click to browse</span>
                      </span>
                      <input type="file" id="myFile" name="image" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
              </fieldset>
              <div className="bot">
                <button className="tf-button w208" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
