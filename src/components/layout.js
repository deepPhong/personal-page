import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname?location.pathname:null) === rootPath

  let header

  if (isRootPath) {
    header = (
      <header className="nav-header">
        <Link to="/">
          <h3>{title}</h3>
        </Link>
        <ul>
          <ListLink to="/publications/">publications</ListLink>
          <ListLink to="/resume/">resume</ListLink>
          <ListLink to="/contact/">contact</ListLink>
        </ul>
      </header>
    )
  } else {
    header = (
      <header className="nav-header">
        <Link to="/">
          {/* <h3>{title}</h3> */}
          ← home
        </Link>
        <ul>
          <ListLink to="/publications/">publications</ListLink>
          <ListLink to="/resume/">resume</ListLink>
          <ListLink to="/contact/">contact</ListLink>
        </ul>
      </header>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <div className="icons">
          <a href="https://github.com/deepPhong" target="_blank" rel='noreferrer'>
            <StaticImage quality={100} className="icon" src="../images/github.svg" alt="github" />
          </a>
          <a href="https://twitter.com/deepPhong" target="_blank" rel='noreferrer'>
            <StaticImage quality={100} className="icon" src="../images/twitter.svg" alt="github" />
          </a>
          <a href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" target="_blank" rel='noreferrer'>
            <StaticImage quality={100} className="icon" src="../images/linkedin.svg" alt="github" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
