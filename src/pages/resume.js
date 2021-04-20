import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Resume = (props) => {
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
            awards {
              date
              title
            }
            education {
              area
              endDate
              institution
              startDate
              studyType
              website
            }
            languages {
              fluency
              language
            }
            skills {
              keywords
              level
              name
            }
            work {
              company
              endDate
              highlights
              position
              startDate
              summary
              website
            }
          }
        }
      }
    }  
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const info = data.allDataJson.edges[0].node
  const { basics, education, skills, work } = info

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Resume"/>
      <section className="md:w-tufte-main mb-8">
        <h2 id="pageTitle">Resume</h2>
        <div className="flex flex-col md:flex-row items-center">
          <StaticImage
            className="mr-4 min-w-avatar min-h-avatar rounded-full"
            layout="fixed"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../images/profile-pic.jpg"
            width={100}
            height={100}
            quality={100}
            alt="Profile picture"
          />
          <p>{basics.summary}</p>
        </div>
      </section>
      <section className="md:w-tufte-main">
        <div className="md:flex md:flex-row md:space-x-4 md:justify-between">
          <div className="md:flex-grow-2 md:flex-shrink-3">
            <h3>Experience</h3>
            <ul className="list-none pl-0">
              {work.map((work, index) => {
                return (
                  <li key={index}>
                    <a href={work.website} target="_blank" rel="noreferrer">
                    {work.company}
                    </a>
                    <div className="text-sm">
                      {work.startDate.substring(0, 7)} - {work.endDate.substring(0, 7)}
                    </div>
                    <p 
                      className="mt-0 font-sans text-tufte-margin leading-tight" 
                      dangerouslySetInnerHTML={{ __html: work.summary }} 
                    />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="md:flex-grow md:flex-shrink-2">
            <h3 className="mt-10 md:mt-0">Education</h3>
            <ul className="list-none pl-0">
              {education.map((education, index) => {
                return (
                  <li key={index}>
                    <a href={education.website} target="_blank" rel="noreferrer">
                    {education.institution}
                    </a>
                    <div className="text-sm">
                      {education.startDate.substring(0, 7)} - {education.endDate.substring(0, 7)}
                    </div>
                    <p className="mt-0 font-sans text-tufte-margin leading-tight" >
                      {education.studyType} - {education.area}
                    </p>
                  </li>
                )
              })}
            </ul>
            <h3 className="mt-10">Skills</h3>
            <ul className="list-none pl-0">
              {skills.map((skill, index) => {
                return (
                  <li key={index}>
                    <p className="mb-0">{skill.name}</p>
                    <p className="mt-0 font-sans text-tufte-margin leading-tight">
                      {skill.level}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )

}

export default Resume