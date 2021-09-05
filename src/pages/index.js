import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  const ListLink = props => (
    <li>
      <Link to={props.to} className="text-base no-tufte-underline">
        <button className="border border-current-text rounded px-2 hover:border-orange hover:text-orange">{props.children}</button>
      </Link>
    </li>
  )

  const menuItems = [
    {
      name: "publications",
      href: "/publications/"
    },
    {
      name: "resume",
      href: "/resume/"
    },
    {
      name: "about",
      href: "/about/"
    },
    {
      name: "contact",
      href: "/contact/"
    },
  ];

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <ul className="flex flex-row space-x-2 list-none pl-0">
        {menuItems.map((item) => (
          <ListLink to={item.href}>{item.name}</ListLink>
        ))}
      </ul>
      <Bio className="my-10" />
      <section className="my-8">
        <h2 id="pageTitle">Posts</h2>
        <hr className="border-gray-300 my-4"/>
        <ol className="list-none pl-0">
          { posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug}>
                <div>
                  <header>
                    <h3 className="mb-0">
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                    <small>
                      {post.frontmatter.date} - {post.timeToRead} min read
                    </small>
                  </header>
                  <p className="mt-0"
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
        timeToRead
      }
    }
  }
`
