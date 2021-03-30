import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const Contact = () => {
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
    <Layout location={window.location} title={siteTitle}>
      <SEO title="Contact" />
      <h2>Happy to talk, email me at the address below</h2>
      <p>
        dinhphongng [at] gmail [dot] com
      </p>
    </Layout>
  )
}

export default Contact