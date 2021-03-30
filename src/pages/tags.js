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
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    } 
  `)
  console.log(data)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = data.allMarkdownRemark.group

  return(
    <Layout location={props.location} title={siteTitle}>
      <div>
        <h1>Tags</h1>
        <ul className="tag-list">
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <a className="tag">{tag.fieldValue} ({tag.totalCount})</a> 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage