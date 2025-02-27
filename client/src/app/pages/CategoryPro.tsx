import ShopSidebar from "../components/shop/shop-sidebar";
import CategoryProComponent from "../components/shop/CategoryPro";
import Head from "../components/Head";   


const CategoryPro = () => {
    return (
        <>
         <Head title="Category Products" />
            <section className="shop-main container d-flex pt-4 pt-xl-5">
                <ShopSidebar />
                <CategoryProComponent />
            </section>
        </>
    );
};

export default CategoryPro;
