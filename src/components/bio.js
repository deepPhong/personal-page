import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <section className={ props.className }>
      {author?.name && (
        <p>
          {author?.summary || null}
        </p>
      )}
    </section>
  )
}

export default Bio
