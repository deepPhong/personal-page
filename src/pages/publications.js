import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

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
      <Seo title="Publications"/>
      <section>
        <h1 id="pageTitle">Publications</h1>
        <ul>
          {publications.map((publication, index) => {
            return (
              <li key={index}>
                <a href={publication.website} target="_blank" rel="noreferrer">
                  {publication.name}
                </a>
                <div className="date">
                  <em>{publication.publisher}, {publication.releaseDate}</em>
                </div>
              </li>
            )
          })}
        </ul>
        <p>More on my <a href="https://scholar.google.com/citations?user=YVBpD3oAAAAJ" target="_blank" rel="noreferrer">Google Scholar profile</a></p>
      </section>
    </Layout>
  )

}

export default Publications