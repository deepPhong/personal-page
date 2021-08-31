import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const Contact = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={props.location} title={siteTitle}>
      <Seo title="Contact" />
      <h1>Happy to talk, email me at the address below</h1>
      <p>
        dinhphongng [at] gmail [dot] com
      </p>
    </Layout>
  )
}

export default Contact