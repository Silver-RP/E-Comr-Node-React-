import Slideshow from "../components/home/Slideshow";
import Section2 from "../components/home/Section2";
import Section3 from "../components/home/Section3";
import Section4 from "../components/home/Section4";
import Section5 from "../components/home/Section5";
import Head from "../components/Head";

const Home = () => {
  return (
    <>
    <Head title="Home" />
      <Slideshow /> 
      <div className="container mw-1620 bg-white border-radius-10">
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Section2 />
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Section3 />
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Section4 />
        <div className="mb-3 mb-xl-5 pt-1 pb-4"></div>
        <Section5 />
      </div>
    </>
  );
};

export default Home;
