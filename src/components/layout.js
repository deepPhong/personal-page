import * as React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Marginnote from "./tufte-marginnote"

const shortcodes = { Marginnote }

library.add(fab)

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath

  // const headline = isRootPath? title: "⇠ home";

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
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="nav-header">
        <div className="first-row">
          <Link to="/" className="no-tufte-underline">
            <h1>{title}</h1>
          </Link>
          <ThemeToggler className="toggle">
            {({ theme, toggleTheme }) => (
              <DarkModeSwitch
                checked={theme === 'dark'}
                moonColor="#ff5700"
                sunColor="#ff5700"
                animationProperties={toggleProperties}
                onChange={(e) => {
                  toggleTheme(e ? 'dark': 'light');
                  const isComment = document.querySelector("iframe.utterances-frame") !== null
                  if (isComment === true) {
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
              />
            )}
          </ThemeToggler>
        </div>
        <ul>
          <ListLink to="/">blog</ListLink>
          <ListLink to="/publications/">publications</ListLink>
          <ListLink to="/resume/">resume</ListLink>
          <ListLink to="/contact/">contact</ListLink>
        </ul>
      </header>
      <main className="content">
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>
      <footer className="footer">
        <div className="icons">
          <a 
            href="https://github.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className=" no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "github"]} className="icon" />
          </a>
          <a 
            href="https://gitlab.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className=" no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "gitlab"]} className="icon" />
          </a>
          <a 
            href="https://twitter.com/deepPhong"
            target="_blank" 
            rel='noreferrer'
            className=" no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} className="icon" />
          </a>
          <a 
            href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" 
            target="_blank" 
            rel='noreferrer'
            className=" no-tufte-underline"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} className="icon"/>
          </a>
        </div>
        <small>© {new Date().getFullYear()},
          {` `}
          dinh-phong nguyen
        </small>
      </footer>
    </div>
  )
}

export default Layout
