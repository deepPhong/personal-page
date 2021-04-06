import * as React from "react"
import Marginnote from "./marginnote"

const MDXStyles = () => {
  const classNamesReplacements = {
    "katex": "katex text-xl w-full",
    "katex-html": "katex-html w-full py-3 overflow-x-auto overflow-y-visible",
    "table-wrapper": "table-wrapper block overflow-x-auto w-full my-4",
  }

  const recursiveMap = (children, fn) => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn)
        });
      }
      return fn(child);
    });
  }
  
  const replaceClassName = (classNamesReplacements) => {
    return (child) => {
      if (classNamesReplacements.hasOwnProperty(child.props.className)) {
        return React.cloneElement(child, {
          className: classNamesReplacements[child.props.className]
        })
      } else {
        return child
      }
    }
  }

  return({
    table: props => <table {...props} className="border-collapse m-auto text-tufte-margin" />,
    th: props => <th {...props} className="relative border border-solid border-current p-2 text-left" />,
    td: props => <td {...props} className="relative border border-solid border-current p-2 text-left" />,
    wrapper: ({children, ...props}) => {
      return <>{ recursiveMap(children, replaceClassName(classNamesReplacements)) }</>
    },
    Marginnote: props => <Marginnote {...props} />
  }) 
}

export default MDXStyles