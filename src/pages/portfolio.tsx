import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Seo } from '../layout'
import { PortfolioEntry } from '../components/porfolio'
import '../styles/pages/portfolio.css'

const PortfolioPage = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  return (
    <Layout location="Portfolio">
      <Seo title="Portfolio" />
      <main className="portfolio">
        <header>
          <h2>Portfolio</h2>
          <p>Welcome to the portfolio!</p>
        </header>

        <article>
          {nodes
            .filter((edge: { node: { frontmatter: { startDate: any } } }) => !!edge.node.frontmatter.startDate)
            .map((edge: { node: { id: React.Key } }) => (
              <PortfolioEntry key={`project-${edge.node.id}`} project={edge.node} />
            ))}
        </article>
      </main>
    </Layout>
  )
}

export default PortfolioPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: [{ frontmatter: { pinned: DESC } }, { frontmatter: { startDate: DESC } }]
      filter: { fileAbsolutePath: { regex: "/(portfolio)/" } }
    ) {
      nodes {
        id
        html
        frontmatter {
          pinned
          title
          startDate(formatString: "MMM YYYY")
          endDate(formatString: "MMM YYYY")
          external
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          featuredVideo
          description
        }
      }
    }
  }
`
