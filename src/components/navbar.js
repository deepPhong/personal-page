import * as React from 'react'
import { Transition, Popover} from "@headlessui/react"
import { MenuAlt3Icon, XIcon } from '@heroicons/react/outline'
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const menuItems = [
  {
    name: "posts",
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

const ListLink = props => (
  <li>
    <Link to={props.to} className={props.className}>{props.children}</Link>
  </li>
)

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
    <Popover className={props.className}>
      {({ open }) => (
        <div className="flex flex-col items-end">
          <Transition
            show={open && props.appearsWhen}
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
              as="ul"
              className="z-10 flex flex-col space-y-4 bg-transparent list-none pl-0 my-6 overflow-visible"
            >
              {menuItems.map((item) => (
                <ListLink to={item.href}>
                  <div className="rounded-md py-2 px-4 text-base bg-current-bg shadow dark:shadow-lg">
                    {item.name}
                  </div>
                </ListLink>
              ))}
            </Popover.Panel>
          </Transition>
          <Transition
                show={props.appearsWhen}
                as={React.Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 translate-y-20"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-20"
              >
            <Popover.Button
              className="bg-current-bg rounded-full w-16 h-16 flex justify-center items-center outline-none shadow dark:shadow-md"
            >
              {open ? <XIcon className="h-8 w-8"/> : <MenuAlt3Icon className="h-8 w-8"/>}
            </Popover.Button>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

const Navbar = (props) => {
  return(
    <nav>
      <header className="w-full md:pl-tufte-main-md px-tufte-main md:pr-0 pt-8 pb-6">
        <div className="flex flex-row justify-between md:w-tufte-main">
          <div className="flex flex-row items-center">
          <Link to="/" className="no-tufte-underline text-xl font-medium mr-8 md:mr-0">
            {props.title}
          </Link>
          </div>
          <ThemeSwitch className="scale-75 md:scale-100 motion-safe:animate-fadeIn"/>
        </div>
        <ul className="flex flex-row space-x-4 list-none pl-0">
          {menuItems.map((item) => (
            <ListLink to={item.href} className="text-base no-tufte-underline">{item.name}</ListLink>
          ))}
        </ul>
      </header>
      <Transition 
        show={!props.topPosition}
        enter="transition-transform duration-300"
        enterFrom="transform -translate-y-18"
        enterTo="transform translate-y-0"
        leave="transition-transform duration-300"
        leaveFrom="transform translate-y-0"
        leaveTo="transform -translate-y-18"
        className="transform -translate-y-14 w-full bg-current-bg top-0 left-0 right-0 fixed z-10 h-14 shadow dark:shadow-md"
      >
        <div className="flex flex-row items-center h-full w-full mx-auto max-w-screen-2xl">
          <div className="px-tufte-main md:pl-tufte-main-md md:pr-0 truncate">
            <Link to={props.location.pathname} className="no-tufte-underline text-base font-medium truncate">
              {props.pageTitle}
            </Link>
          </div>
        </div>
      </Transition>
      <div className="fixed z-10 bottom-8 md:bottom-14 w-full md:pl-tufte-main-md px-tufte-main md:pr-0 max-w-screen-2xl">
        <PopoverMenu appearsWhen={!props.topPosition} className="md:w-tufte-main"/>
      </div>
    </nav>
  )
}

export default Navbar