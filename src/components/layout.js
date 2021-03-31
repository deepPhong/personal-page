import * as React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

library.add(fab)

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath

  const headline = isRootPath? title: "⇠ home";

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="nav-header">
        <div className="first-row">
          <Link to="/">
            <h3>{headline}</h3>
          </Link>
          <ThemeToggler className="toggle">
            {({ theme, toggleTheme }) => (
              <DarkModeSwitch
                checked={theme === 'dark'}
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
          <ListLink to="/publications/">publications</ListLink>
          <ListLink to="/resume/">resume</ListLink>
          <ListLink to="/contact/">contact</ListLink>
        </ul>
      </header>
      <main>{children}</main>
      <footer>
        <div className="icons">
          <a href="https://github.com/deepPhong" target="_blank" rel='noreferrer'>
            <FontAwesomeIcon icon={["fab", "github"]} className="icon" />
          </a>
          <a href="https://gitlab.com/deepPhong" target="_blank" rel='noreferrer'>
            <FontAwesomeIcon icon={["fab", "gitlab"]} className="icon" />
          </a>
          <a href="https://twitter.com/deepPhong" target="_blank" rel='noreferrer'>
            <FontAwesomeIcon icon={["fab", "twitter"]} className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" target="_blank" rel='noreferrer'>
            <FontAwesomeIcon icon={["fab", "linkedin"]} className="icon"/>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
