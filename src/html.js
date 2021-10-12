import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#2f4f4f" media="(prefers-color-scheme: dark)"/>
        <meta name="theme-color" content="#e5e9f0"/>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          key="dpnguyen-theme"
          dangerouslySetInnerHTML={{
            __html: `(function() {
                try {
                  let mode = localStorage.getItem('theme');
                  let supportDarkMode =
                    window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!mode && supportDarkMode)
                    document.documentElement.classList.add('dark');
                  if (!mode) return;
                  document.documentElement.classList.add(mode);
                } catch (e) {}
              })();`,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
