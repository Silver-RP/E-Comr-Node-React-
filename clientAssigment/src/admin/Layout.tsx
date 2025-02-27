import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ApexCharts from "apexcharts";
import Head from "./components/Head";




const AdminLayout = () => {
  const scriptsLoaded = useRef(false);
  const chartRef = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (scriptsLoaded.current) return; // Prevent duplicate script loading
    scriptsLoaded.current = true;

    document.body.classList.add("gradient-bg");

    const scriptUrls = [
      "/assets/admin/js/jquery.min.js",
      "/assets/admin/js/bootstrap.min.js",
      "/assets/admin/js/bootstrap-select.min.js",
      "/assets/admin/js/sweetalert.min.js",
      "/assets/admin/js/apexcharts/apexcharts.js",
    ];

    const scriptElements: HTMLScriptElement[] = [];

    const loadScriptsSequentially = async () => {
      for (const src of scriptUrls) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(`Failed to load: ${src}`);
          document.body.appendChild(script);
          scriptElements.push(script);
        });
      }

      // Ensure ApexCharts is loaded before initializing
      if ((window as any).ApexCharts) initializeCharts();
    };

    loadScriptsSequentially().catch(console.error);

    return () => {
      document.body.classList.remove("gradient-bg");
      scriptElements.forEach((script) => script.remove());
      chartRef.current?.destroy();
    };
  }, []);

  const initializeCharts = () => {
    if ((window as any).ApexCharts) {
      const options = {
        series: [
          { name: "Total", data: [0, 0, 0, 0, 0, 273.22, 208.12, 0, 0, 0, 0, 0] },
          { name: "Pending", data: [0, 0, 0, 0, 0, 273.22, 208.12, 0, 0, 0, 0, 0] },
          { name: "Delivered", data: Array(12).fill(0) },
          { name: "Canceled", data: Array(12).fill(0) },
        ],
        chart: { type: "bar", height: 325, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: false, columnWidth: "10px", endingShape: "rounded" } },
        dataLabels: { enabled: false },
        legend: { show: false },
        colors: ["#2377FC", "#FFA500", "#078407", "#FF0000"],
        stroke: { show: false },
        xaxis: { labels: { style: { colors: "#212529" } }, categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
        yaxis: { show: false },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: (val: number) => `$ ${val}` } },
      };

      const chartElement = document.querySelector("#line-chart-8");
      if (chartElement) {
        chartRef.current = new ApexCharts(chartElement, options);
        chartRef.current.render();
      }
    }
  };

  return (
    <>
    <Head title="" />
    <div className="body">
      <div id="wrapper">
        <div id="page">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              <div className="main-content">
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AdminLayout;
