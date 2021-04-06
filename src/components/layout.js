import * as React from "react"
import { Helmet } from 'react-helmet';

import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MDXStyles from "./mdx-styles"

library.add(fab)

const ListLink = props => (
  <li>
    <Link to={props.to} className={props.className}>{props.children}</Link>
  </li>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath

  const toggleProperties = {
    dark: {
      circle: {
        r: 9,
      },
      mask: {
        cx: '50%',
        cy: '23%',
        stroke: "black"
      },
      svg: {
        transform: 'rotate(40deg)',
      },
      lines: {
        opacity: 0,
      },
    },
    light: {
      circle: {
        r: 4,
      },
      mask: {
        cx: '100%',
        cy: '0%',
      },
      svg: {
        transform: 'rotate(90deg)',
      },
      lines: {
        opacity: 1,
      },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  return (
    <div data-is-root-path={isRootPath} className="flex flex-col h-full">
      <Helmet>
          <body className="bg-white font-serif text-tufte-base text-black dark:bg-green dark:text-white px-tufte-main md:w-tufte-main md:pl-tufte-main-md md:pr-0 max-w-screen-2xl box-content" />
      </Helmet>
      <header className="py-8 md:w-tufte-section">
        <div className="flex flex-row justify-between align-baseline mb-4">
          <Link to="/" className="text-tufte-xxl no-tufte-underline">{title}</Link>
          <ThemeToggler>
            {({ theme, toggleTheme }) => {
              const isDark = theme === "dark";
              if (isDark) {
                document.documentElement.classList.add("dark")
              }
              return(<DarkModeSwitch
                checked={ isDark }
                moonColor="#ff5700"
                sunColor="#ff5700"
                animationProperties={ toggleProperties }
                onChange={(e) => {
                  if (e) {
                    document.documentElement.classList.add("dark")
                  } else {
                    document.documentElement.classList.remove("dark")
                  }
                  toggleTheme(e? "dark" : "light")
                  const isComment = document.querySelector("iframe.utterances-frame")
                  if (isComment) {
                    const utterancesTheme = e? "icy-dark": "github-light";
                    (
                      document
                      .querySelector("iframe.utterances-frame")
                      .contentWindow.postMessage(
                        { type: "set-theme", theme: utterancesTheme },
                        "https://utteranc.es/"
                      )
                    )
                  }
                }}
              />)
            }}
          </ThemeToggler>
        </div>
        <ul className="flex flex-row list-none pl-0">
          <ListLink className="mr-4 text-tufte-base" to="/">blog</ListLink>
          <ListLink className="mr-4 text-tufte-base" to="/publications/">publications</ListLink>
          <ListLink className="mr-4 text-tufte-base" to="/resume/">resume</ListLink>
          <ListLink className="text-tufte-base" to="/contact/">contact</ListLink>
        </ul>
      </header>
      <main className="flex-grow flex-shrink-0">
        <MDXProvider components={ MDXStyles }>{children}</MDXProvider>
      </main>
      <footer className="py-8 flex-shrink-0">
        <div className="flex flex-row">
          <a 
            href="https://github.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-base mr-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "github"]} className="icon" />
          </a>
          <a 
            href="https://gitlab.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-base mr-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "gitlab"]} className="icon" />
          </a>
          <a 
            href="https://twitter.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className="text-base mr-2 no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} className="icon" />
          </a>
          <a 
            href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" 
            target="_blank" 
            rel='noreferrer'
            className="text-base no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} className="icon"/>
          </a>
        </div>
        <p className="text-xs my-2">© {new Date().getFullYear()},
          {` `}
          dinh-phong nguyen
        </p>
      </footer>
    </div>
  )
}

export default Layout
