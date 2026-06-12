import React, { useEffect } from "react";
import "../../assets/styleCss";
import { scriptJS } from "../../assets/script";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import TopBar from "./header/TopBar";
import { useLocation } from "react-router";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    var loadScriptsSequentially = async () => {
      for (const src of scriptJS) {
        await new Promise((resolve, reject) => {
          var script = document.createElement("script");
          script.src = new URL(src, import.meta.url).href;
          script.async = true; // Ensure scripts are executed in order
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          if (!document.querySelector(`script[src="${script.src}"]`)) {
            document.body.appendChild(script);
          }
        });
      }
    };

    loadScriptsSequentially();
  }, [pathname]);
  return (
    // ## Page Wrapper
    <div id="wrap" className="layout-1">
      <TopBar />

      <Header />
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
