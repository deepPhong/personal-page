import React from "react"
import kebabCase from "lodash/kebabCase"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"

const TagsPage = (props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    } 
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = data.allMdx.group

  return(
    <Layout location={props.location} title={siteTitle}>
      <div>
        <h1 id="pageTitle">Tags</h1>
        <ul className="tag-list">
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage