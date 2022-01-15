import * as React from 'react'
import EmailForm from './email-form'

const Footer = (props) => {
  return(
    <footer className={`${props.className} flex flex-col items-center px-tufte-main w-full pb-6 pt-2 flex-shrink-0 space-y-4
      md:items-start md:justify-between ${props.layoutAbsolute ? "flex" : ""}`}>
        <EmailForm/>
        <div className='flex flex-col items-center justify-start'>
          <p className="text-xs my-0">© {new Date().getFullYear()},
            {` `}
            {props.copyright}
          </p>
        </div>
      </footer>
  )
}

export default Footer