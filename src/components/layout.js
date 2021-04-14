import * as React from "react"
import { useState, useEffect } from "react"
import { Helmet } from 'react-helmet';
import { MDXProvider } from "@mdx-js/react"

import Navbar from "./navbar"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MDXStyles from "./mdx-styles"

library.add(fab)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath
  const pageTitle = document.getElementById("pageTitle") ? document.getElementById("pageTitle").innerHTML : "";

  const [topPosition, setTopPosition] = useState(true)

  useEffect (() => {
    const threshold = document.querySelector("main");
    const stickyTop = threshold.offsetTop;
    document.addEventListener("scroll", e => {
        let scrolled = document.scrollingElement.scrollTop;
        if (scrolled > stickyTop) {
          setTopPosition(false)
        } else  {
          setTopPosition(true)
        }
      })
  },[])

  return (
    <div data-is-root-path={ isRootPath } className="flex flex-col h-full">
      <Helmet>
          <body className="bg-white font-serif text-tufte-base text-black mx-auto md:pr-0 max-w-screen-2xl box-content dark:bg-green dark:text-white" />
      </Helmet>
      <Navbar location={ location } title={ title } topPosition={ topPosition } pageTitle={ pageTitle } />
      <main className={"flex-grow px-tufte-main md:pl-tufte-main-md flex-shrink-0 relative" + (topPosition ? "" : " pt-36" ) }>
        <MDXProvider components={ MDXStyles }>{ children }</MDXProvider>
      </main>
      <footer className="flex flex-col md:pl-tufte-main-md md:flex-row items-center md:items-baseline md:justify-between pb-6 pt-2 flex-shrink-0 md:w-tufte-section">
        <div className="flex flex-row items-center">
          <a 
            href="https://github.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 md:ml-0 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <a 
            href="https://gitlab.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "gitlab"]} />
          </a>
          <a 
            href="https://twitter.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a 
            href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" 
            target="_blank" 
            rel='noreferrer'
            className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]}/>
          </a>
        </div>
        <p className="text-xs my-2">© {new Date().getFullYear()},
          {` `}
          { title }
        </p>
      </footer>
    </div>
  )
}

export default Layout
