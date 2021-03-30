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
  const { basics, awards, education, languages, skills, work } = info

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Resume"/>
      <div className="resume">
        <h1>Resume</h1>
        <div className="summary">
          <StaticImage
            className="bio-avatar"
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
        <div className="resume-columns-container">
          <div className="work">
            <h3>Experience</h3>
            <ul>
              {work.map((work, index) => {
                return (
                  <li key={index}>
                    <div className="date">
                      {work.startDate.substring(0, 7)} - {work.endDate.substring(0, 7)}
                    </div>
                    <a href={work.website} target="_blank" rel="noreferrer">
                    <h5>{work.company}</h5> {` `}
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: work.summary }} />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="education">
          <h3>Education</h3>
            <ul>
              {education.map((education, index) => {
                return (
                  <li key={index}>
                    <div className="date">
                      {education.startDate.substring(0, 7)} - {education.endDate.substring(0, 7)}
                    </div>
                    <a target="_blank">
                    <h5>{education.institution}</h5> {` `}
                    </a>
                    <p>{education.studyType} - {education.area}</p>
                  </li>
                )
              })}
            </ul>
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => {
                return (
                  <li key={index}>
                    <a target="_blank">
                    <h5>{skill.name}</h5> {` `}
                    </a>
                    <p>{skill.level}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default Resume