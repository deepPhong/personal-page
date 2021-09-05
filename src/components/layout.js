import * as React from "react"
import { useState, useEffect } from "react"
import { Helmet } from 'react-helmet';
import { MDXProvider } from "@mdx-js/react"

import Navbar from "./navbar"
import Footer from "./footer"

import "@fontsource/rubik/300.css"
import "@fontsource/rubik/500.css"
import "@fontsource/rubik/600.css"
import "@fontsource/rubik/700.css"
import "@fontsource/rubik/900.css"
import "@fontsource/rubik"

import MDXStyles from "./mdx-styles"

const Layout = ({ location, title, layoutAbsolute, children }) => {
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
          <body className="bg-lightBlue font-sans text-lg text-black md:pr-0 box-content dark:bg-green dark:text-white" />
      </Helmet>
      <Navbar className="max-w-7xl" location={location} blogtitle={title} pageTitle={pageTitle} />
      <main className={"px-tufte-main w-full mt-16 max-w-7xl" + (layoutAbsolute ? " flex-1 overflow-y-auto" : " flex-shrink-0 flex-grow relative") }>
        <MDXProvider components={MDXStyles}>{children}</MDXProvider>
      </main>
      <Footer className="max-w-7xl" copyright={title}/>
    </div>
  )
}

export default Layout
