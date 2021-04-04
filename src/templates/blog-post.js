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
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <section>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className="subtitle">{post.frontmatter.date} - {post.timeToRead} min read</p>
          <ul className="tags">
            {post.frontmatter.tags.map((tag, index) => {
              const link = `/tags/${kebabCase(tag)}`
              return(
                <li key={index}>
                  <a className="tag-box" href={link}>{tag}</a>
                </li>
              )
            })}
          </ul>
        </section>
        <MDXRenderer>{post.body}</MDXRenderer>
        <Comments />
      </article>
      <nav className="blog-post-nav">
        {previous && (
          <Link to={previous.fields.slug} rel="prev">⇠ previous post</Link>
        )}
        <Link to="/" rel="home">
          take me home
        </Link>
        {next && (
          <Link to={next.fields.slug} rel="next">next post ⇢</Link>
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
