import * as React from "react"
import { useState, useEffect } from "react"
import { Helmet } from 'react-helmet';
import { MDXProvider } from "@mdx-js/react"

import Navbar from "./navbar"
import Footer from "./footer"

import "@fontsource/inter/300.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/900.css"
import "@fontsource/inter"

import MDXStyles from "./mdx-styles"

const Layout = ({ location, title, layoutAbsolute, children, hideNavbar=false }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath

  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    let title = document.getElementById("pageTitle") ? document.getElementById("pageTitle").innerHTML : "";
    setPageTitle(title)
  }, []);

  return (
    <div data-is-root-path={isRootPath} className={"flex flex-col items-center" + (layoutAbsolute ? " h-full my-0 py-0" : " h-full")}>
      <Helmet>
          <body className="bg-white font-sans text-lg text-black md:pr-0 box-content dark:bg-green dark:text-white" />
      </Helmet>
      {!hideNavbar && <Navbar className="max-w-7xl" location={location} blogtitle={title} pageTitle={pageTitle} />}
      <main 
        className={
          "px-tufte-main w-full max-w-7xl" + 
          (layoutAbsolute ? " flex-1 overflow-y-auto" : " flex-shrink-0 flex-grow relative") +
          (hideNavbar ? " mt-0": " mt-16")
        }
      >
        <MDXProvider components={MDXStyles}>{children}</MDXProvider>
      </main>
      <Footer className="max-w-7xl" copyright={title}/>
    </div>
  )
}

export default Layout
