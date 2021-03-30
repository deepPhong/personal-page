import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
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
    <div className="bio">
      {author?.name && (
        <p>
          {author?.summary || null}
        </p>
      )}
    </div>
  )
}

export default Bio
