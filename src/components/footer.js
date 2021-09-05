import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

library.add(fab)

const Footer = (props) => {
  return(
    <footer className={`${props.className} flex flex-col items-center px-tufte-main w-full pb-6 pt-2 flex-shrink-0
      md:items-start md:justify-between ${props.layoutAbsolute ? "flex" : ""}`}>
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
        <p className="text-xs my-0">© {new Date().getFullYear()},
          {` `}
          {props.copyright}
        </p>
      </footer>
  )
}

export default Footer