import * as React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "../components/comments"

import "katex/dist/katex.min.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle} pageTitle={post.frontmatter.title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        itemScope
        itemType="http://schema.org/Article"
      >
        <section className="w-full md:w-tufte-main mt-8 mb-18">
          <h1 id="pageTitle" className="mb-4" itemProp="headline">{post.frontmatter.title}</h1>
          <p className="text-tufte-subtitle italic mb-4">{post.frontmatter.date} - {post.timeToRead} min read</p>
          <ul className="flex flex-row list-none pl-0">
            { post.frontmatter.tags.map((tag, index) => {
              const link = `/tags/${kebabCase(tag)}`
              return(
                <li key={index} className="mr-4">
                  <a href={link}>{tag}</a>
                </li>
              )
            })}
          </ul>
        </section>
        <MDXRenderer 
          remoteImages={post.frontmatter.embeddedImagesRemote} 
          localImages={post.frontmatter.embeddedImagesLocal}
        >
          {post.body}
        </MDXRenderer>
        <Comments className="md:w-tufte-section"/>
      </article>
      <nav className="md:w-tufte-section flex flex-row justify-around my-8">
        {previous && (
          <Link to={previous.fields.slug} rel="prev">⇠ previous</Link>
        )}
        <Link to="/" rel="home">
          home
        </Link>
        {next && (
          <Link to={next.fields.slug} rel="next">next ⇢</Link>
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
        embeddedImagesRemote {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
