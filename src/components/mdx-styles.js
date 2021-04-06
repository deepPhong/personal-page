import * as React from "react"
import Marginnote from "./tufte-marginnote"

function recursiveMap(children, fn) {
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

const setKatex = (child) => {
  if(child.props.className === "katex") {
    return React.cloneElement(child, {
      className: "katex text-xl w-full"
    })
  } else if (child.props.className === "katex-html") {
    return React.cloneElement(child, {
      className: "katex-html w-full py-3 overflow-x-auto overflow-y-visible"
    })
  } else {
    return child;
  }
}


const MDXStyles = {
  table: props => <table {...props} className="border-collapse m-auto text-tufte-margin" />,
  th: props => <th {...props} className="relative border border-solid border-current p-2 text-left" />,
  td: props => <td {...props} className="relative border border-solid border-current p-2 text-left" />,
  wrapper: ({children, ...props}) => {
    return <>{recursiveMap(children, setKatex)}</>
  },
  Marginnote: props => <Marginnote {...props} />
}

export default MDXStyles