import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Seo } from '../layout'
import { JournalCard } from '../components/journal'
import '../styles/pages/journal.css'

// prettier-ignore
const JournalPage = ({ data: { allMarkdownRemark: { edges }, }, }) => {
  return (
    <Layout location="Journal">
      <Seo title="Journal" />
      <main className="journal">
        <header>
          <h2>Journal</h2>
          <p>
            Welcome to my journal! This is where you'll find things I just decided to write for some reason.
          </p>
        </header>

        <article>
          {edges
            .filter((edge: { node: { frontmatter: { date: any } } }) => !!edge.node.frontmatter.date)
            .map((edge: { node: { id: React.Key } }) => (
              <JournalCard key={`journal-card-${edge.node.id}`} post={edge.node} />
            ))}
        </article>
      </main>
    </Layout>
  )
}

export default JournalPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: [DESC, ASC], fields: [frontmatter___pinned, frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/(journal)/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 80)
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            slug
            title
            pinned
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`
