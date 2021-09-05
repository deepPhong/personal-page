import * as React from "react"

const Marginnote = (props) => {
  const Tag = props.tag? props.tag: "div";
  return(
    <Tag className={props.className}>
      <label htmlFor={props.id} className="md:hidden inline">&#8853;</label>
      <input type="checkbox" id={props.id} className="hidden"/> 
      <span className={`hidden checked-sibling:block checked-sibling:clear-both 
      checked-sibling:relative checked-sibling:align-baseline checked-sibling:my-4 checked-sibling:mx-8 
      md:clear-right md:float-right md:-mr-80 text-sm md:w-1/3 md:mt-2 md:mb-0 
      md:align-baseline md:relative md:block`}>{props.children}</span>
    </Tag>
  )
}

export default Marginnote