import * as React from 'react'
import { useState, useEffect, useCallback } from "react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitch = (props) => {
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
    <div className={props.className}>
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          const isDark = theme === "dark";
          return(
          <DarkModeSwitch
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
          />
          )
        }}
      </ThemeToggler>
    </div>
  )
}

const Navbar = (props) => {
  const [y, setY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (window.pageYOffset <= 0) {
        setScrollDirection("up");
      } else if (y > window.scrollY) {
        setScrollDirection("up");
      } else if (y < window.scrollY) {
        setScrollDirection("down");
      }
      setY(window.scrollY);
    }, [y]
  );

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setY(window.scrollY);
      window.addEventListener("scroll", handleNavigation);

      return () => {
        window.removeEventListener("scroll", handleNavigation);
      };
    }
  }, [handleNavigation]);

  return(
    <nav 
      className={`w-full py-4 fixed top-0 z-10  transition duration-500 bg-current-bg
      ease-in-out ${scrollDirection === "up" ? "" : "transform -translate-y-20"}`}
    >
      <div className={`${props.className} px-tufte-main mx-auto`}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
          <Link to="/" className="no-tufte-underline text-xl font-semibold mr-8 md:mr-0" 
          onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
            {props.location.pathname != "/" && isHovered ? "← get back to homepage": props.blogtitle}
          </Link>
          </div>
          <ThemeSwitch className="scale-75 md:scale-100 motion-safe:animate-fadeIn"/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar