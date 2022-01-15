import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "../components/layout"
import Seo from "../components/seo"

library.add(fab)

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
  const { basics, education, skills, work, awards } = info

  return (
    <Layout location={props.location} title={siteTitle}>
      <Seo title="Resume"/>
        <div className="mb-8">
          <h1 id="pageTitle">Resume</h1>
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
        </div>
        <div className="flex flex-row items-center">
            <a 
              href="https://github.com/deepPhong"
              target="_blank" 
              rel='noreferrer'
              className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 md:ml-0 no-tufte-underline"
            >
              <FontAwesomeIcon icon={["fab", "github"]} />
            </a>
            <a 
              href="https://gitlab.com/deepPhong"
              target="_blank" 
              rel='noreferrer'
              className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
            >
              <FontAwesomeIcon icon={["fab", "gitlab"]} />
            </a>
            <a 
              href="https://twitter.com/deepPhong"
              target="_blank" 
              rel='noreferrer'
              className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
            >
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
            <a 
              href="https://www.linkedin.com/in/dinh-phong-nguyen-5122a867/?locale=en_US" 
              target="_blank" 
              rel='noreferrer'
              className="text-3xl md:text-xl p-3 md:p-0 m-3 md:m-2 no-tufte-underline"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]}/>
            </a>
          </div>
        <div>
          <div className="md:flex md:flex-row md:space-x-16 md:justify-between">
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
                      <span className='font-medium'>{work.position}</span> · {work.startDate.substring(0, 7)} → {work.endDate.substring(0, 7)}
                      </div>
                      <p 
                        className="mt-0 font-sans text-sm leading-tight" 
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
                        {education.startDate.substring(0, 7)} → {education.endDate.substring(0, 7)}
                      </div>
                      <p className="mt-0 font-sans text-sm leading-tight" >
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
                      <p className="mb-0 mt-0 text-sm">{skill.name}</p>
                    </li>
                  )
                })}
              </ul>
              <h3 className="mt-10">Awards</h3>
              <ul className="list-none pl-0">
                {awards.map((award, index) => {
                  return (
                    <li key={index}>
                      <p className="mb-0 mt-0 text-sm">{award.title} · {award.date.substring(0, 4)}</p>
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