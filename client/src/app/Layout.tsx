import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../assets/app/css/style.css";
import "../assets/app/css/header.css";
import "../assets/app/css/plugins/swiper.min.css";

export default function Layout() {
  const scriptsLoaded = useRef(false);
  useEffect(() => {
    if (scriptsLoaded.current) return; // Prevent duplicate script loading

    scriptsLoaded.current = true;

    document.body.className = "gradient-bg";

    const scripts = [
      "/assets/app/js/plugins/jquery.min.js",
      "/assets/app/js/plugins/bootstrap.bundle.min.js",
      "/assets/app/js/plugins/bootstrap-slider.min.js",
      "/assets/app/js/plugins/countdown.js",
      "/assets/app/js/plugins/swiper.min.js",
      "/assets/app/js/theme.js",
    ];

    scripts.forEach((src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });

    return () => {
      document.body.className = "";
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
