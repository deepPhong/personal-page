import * as React from "react"

const Marginnote = (props) => {
  const Tag = props.tag? props.tag: "p";
  return(
    <Tag>
      <label htmlFor={props.id} className="margin-toggle">&#8853;</label>
      <input type="checkbox" id={props.id} className="margin-toggle"/> 
      <span className="marginnote">{props.children}</span>
    </Tag>
  )
}

export default Marginnote