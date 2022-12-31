import React from 'react'
import { Layout, Seo } from '../layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import '../styles/pages/journalpage.css'

export default function JournalPage({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const coverImage = getImage(frontmatter.featuredImage)

  return (
    <Layout location={frontmatter.title}>
      <Seo title={frontmatter.title} />
      <main className="journalpage">
        <header>
          <h1>{frontmatter.title}</h1>
          <div>
            <GoBack />
            <span className="date">{frontmatter.date}</span>
          </div>
        </header>

        <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />

        <footer>
          <span>{frontmatter.title}</span>
          <span>{frontmatter.date}</span>
        </footer>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
          publicURL
          extension
        }
      }
    }
  }
`

const GoBack = () => (
  <Link to="/journal" className="go-back-button">
    <svg viewBox="0 -7 3 24" className="mr-2.5 h-6 w-auto overflow-visible">
      <path
        d="M3 0L0 3L3 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
    Go back
  </Link>
)
