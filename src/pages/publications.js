import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const Publications = (props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allDataJson {
        edges {
          node {
            basics {
              name
              label
              location {
                city
              }
              profiles {
                url
                network
              }
              summary
              website
            }
            publications {
              name
              publisher
              releaseDate
              website
            }
          }
        }
      }
    }  
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const info = data.allDataJson.edges[0].node
  const { publications } = info

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Publications"/>
      <div className="publications">
        <h1>Publications</h1>
        <ul>
          {publications.map((publication, index) => {
            return (
              <a href={publication.website} target="_blank" rel="noreferrer">
                <li key={index}>
                  <h4>{publication.name}</h4>
                  <div className="date">
                    {publication.publisher} - {publication.releaseDate}
                  </div>
                </li>
              </a>
            )
          })}
        </ul>
      </div>
    </Layout>
  )

}

export default Publications