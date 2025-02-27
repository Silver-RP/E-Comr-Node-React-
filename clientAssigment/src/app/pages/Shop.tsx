import ShopSidebar from "../components/shop/shop-sidebar";
import ShopList from "../components/shop/shop-list";
import Head from "../components/Head";

const Shop = () => {
  return (
    <>
    <Head title="Shop" />

      <section className="shop-main container d-flex pt-4 pt-xl-5">
        <ShopSidebar />
        <ShopList />
      </section>
    </>
  );
};

export default Shop;
