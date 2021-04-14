import * as React from 'react'
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ListLink = props => (
  <li>
    <Link to={props.to} className={props.className}>{props.children}</Link>
  </li>
)

const Navbar = (props) => {
  // const [topPosition, setTopPosition] = useState(true)

  // useEffect (() => {
  //   const threshold = document.getElementById("navbar")
  //   const sticky = threshold.offsetTop;
  //   document.addEventListener("scroll", e => {
  //       let scrolled = document.scrollingElement.scrollTop;
  //       if (scrolled >= sticky){
  //         setTopPosition(false)
  //       } else {
  //         setTopPosition(true)
  //       }
  //     })
  // },[])

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

  return(
    <header className={"flex items-center h-25 w-full md:pl-0" + (props.topPosition ? "" : " bg-current-bg top-0 fixed z-10 h-14 shadow-sm")}>
      <div className={"flex flex-row justify-between md:pl-tufte-main-md h-25 w-full md:w-tufte-main" + (props.topPosition ? " px-tufte-main md:pr-0 pt-8 pb-6" : " px-6 md:px-0 items-center h-14")}>
        <div className={"flex items-baseline" + (props.topPosition ? " flex-col" : " flex-row")}>
          <Link to="/" className={"transition-all no-tufte-underline mr-4" + (props.topPosition ? " text-tufte-xxl" : " text-tufte-l")}>
            { props.topPosition ? props.title : "φ" }
          </Link>
          <ul id="navbar" className="transition-all flex flex-row list-none pl-0 py-4">
            <ListLink className="mr-4 text-tufte-base" to="/">blog</ListLink>
            <ListLink className="mr-4 text-tufte-base" to="/publications/">publications</ListLink>
            <ListLink className="mr-4 text-tufte-base" to="/resume/">resume</ListLink>
            <ListLink className="text-tufte-base" to="/contact/">contact</ListLink>
          </ul>
        </div>
        <div className="transition-all flex">
          <ThemeToggler>
            {({ theme, toggleTheme }) => {
              const isDark = theme === "dark";
              return(<DarkModeSwitch
                checked={ isDark }
                moonColor="#ff5700"
                sunColor="#ff5700"
                animationProperties={ toggleProperties }
                onChange={(e) => {
                  if (e) {
                    document.documentElement.classList.add("dark")
                    document.documentElement.classList.remove("light")
                  } else {
                    document.documentElement.classList.add("light")
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
      </div>
    </header>
  )
}

export default Navbar