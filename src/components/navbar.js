import * as React from 'react'
import { Transition, Popover } from "@headlessui/react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ListLink = props => (
  <li>
    <Link to={props.to} className={props.className}>{props.children}</Link>
  </li>
)

const menuItems = [
  {
    name: "blog",
    href: "/"
  },
  {
    name: "publications",
    href: "/publications/"
  },
  {
    name: "resume",
    href: "/resume/"
  },
  {
    name: "about",
    href: "/about/"
  },
  {
    name: "contact",
    href: "/contact/"
  },
];

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
            animationProperties={toggleProperties}
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

const PopoverMenu = (props) => {
  return (
    <div className={props.className}>
      <Popover>
        {({ open }) => (
          <div className="flex flex-col items-end">
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 translate-y-20"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 translate-y-20"
            >
              <Popover.Panel
                static
                className="relative z-10 my-6 w-full max-w-xs"
              >
                <div className="overflow-visible rounded-md">
                  <ul className="flex flex-col gap-4 bg-transparent list-none">
                    {menuItems.map((item) => (
                      <ListLink to={item.href}>
                        <div className="rounded-md py-2 px-4 text-tufte-base bg-current-bg shadow dark:shadow-lg">
                          {item.name}
                        </div>
                      </ListLink>
                    ))}
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
            <div className="flex justify-end items-center w-full">
              <Transition
                    show={props.appearsWhen}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 translate-y-20"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-300"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 translate-y-20"
                  >
                <Popover.Button
                  className="bg-current-bg ml-4 py-2 rounded-full w-14 h-14 flex justify-center items-center outline-none shadow dark:shadow-md"
                >
                  <button type="button" aria-label="toggle menu" className="outline-none">
                      {open ?
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg> :
                      <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                        <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                      </svg>}
                    </button>
                </Popover.Button>
              </Transition>
            </div>
          </div>
        )}
      </Popover>
    </div>
  );
}

const Navbar = (props) => {
  return(
    <header id="top" className="w-full md:px-0">
      <div className="w-full md:pl-tufte-main-md px-tufte-main md:pr-0 pt-8 pb-6">
        <div className="flex flex-row md:w-tufte-main justify-between">
          <Link to="/" className="no-tufte-underline text-tufte-xxl mr-8 md:mr-0">
            {props.title}
          </Link>
          <ThemeSwitch className="scale-75 md:scale-100 motion-safe:animate-fadeIn"/>
        </div>
        <ul id="navbar" className="flex flex-row flex-wrap list-none pl-0 py-4">
          {menuItems.map((item, i) => {
            if (i === menuItems.length - 1) {
              return(
                <ListLink to={item.href} className="text-tufte-base">{item.name}</ListLink>
              )
            } else {
              return(
                <ListLink to={item.href} className="mr-4 text-tufte-base">{item.name}</ListLink>
              )
            }
          })}
        </ul>
      </div>
      <Transition 
        show={!props.topPosition}
        enter="transition-transform duration-300"
        enterFrom="transform -translate-y-18"
        enterTo="transform translate-y-0"
        leave="transition-transform duration-300"
        leaveFrom="transform translate-y-0"
        leaveTo="transform -translate-y-18"
        className="transform -translate-y-14 w-full bg-current-bg top-0 fixed z-10 h-14 shadow dark:shadow-md"
      >
        <div className="flex flex-row items-center h-full justify-between px-tufte-main md:w-tufte-main md:pl-tufte-main-md">
          <div className="flex flex-row truncate">
            <Link to={props.location.pathname} className="no-tufte-underline text-tufte-base truncate">
              {props.pageTitle}
            </Link>
          </div>
        </div>
      </Transition>
      <div className="fixed z-10 bottom-8 md:bottom-14 w-full md:pl-tufte-main-md px-tufte-main md:pr-0">
        <PopoverMenu className="md:w-tufte-main" appearsWhen={!props.topPosition}/>
      </div>
    </header>
  )
}

export default Navbar