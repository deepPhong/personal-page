import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SubscriptionConfirmation = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Subscription confirmed" />
      <h1>Thanks for subscribing!</h1>
      <p>Your subscription to my irregular newsletter is now confirmed. You may receive an update soon... ish.</p>
    </Layout>
  )
}

export default SubscriptionConfirmation

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
