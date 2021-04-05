import * as React from "react"

const Marginnote = (props) => {
  const Tag = props.tag? props.tag: "p";
  return(
    <Tag>
      <label htmlFor={props.id} className="md:hidden">&#8853;</label>
      <input type="checkbox" id={props.id} className="hidden"/> 
      <span className="hidden checked-sibling:block md:clear-right md:float-right md:mr-tufte-marginnote text-tufte-margin md:w-1/2 md:mt-2 md:mb-0 md:align-baseline md:relative md:block">{props.children}</span>
    </Tag>
  )
}

export default Marginnote