import * as React from "react"

const Marginnote = (props) => {
  return(
    <span>
      <label htmlFor={props.id} className="margin-toggle">&#8853;</label>
      <input type="checkbox" id={props.id} className="margin-toggle"/> 
      <span className="marginnote">{props.children}</span>
    </span>
  )
}

export default Marginnote