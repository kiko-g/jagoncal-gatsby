import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, Seo, PageVisits } from '../layout'
import usePageVisits from '../hooks/usePageVisits'
import { TranslateIcon } from '@heroicons/react/outline'
import '../styles/pages/home.css'

const HomePage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const [language, setLanguage] = useState('en')
  const domainVisits = usePageVisits('')

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en')
  }

  return (
    <Layout location="Home">
      <Seo title="Home" />
      <main className="home">
        <header className="flex w-full items-center justify-between">
          <h2 className="text-4xl font-bold uppercase">Home</h2>
          <button
            onClick={toggleLanguage}
            className="rounded p-2 text-primary transition hover:opacity-80 dark:text-white"
          >
            <TranslateIcon className="h-6 w-6" />
            <span>{language}</span>
          </button>
        </header>

        <div className="rounded bg-gray-100 dark:bg-gray-800 px-8 py-4">
          {edges
            .filter(
              (edge: { node: { frontmatter: { language: string } } }) => edge.node.frontmatter.language === language
            )
            .map((edge: any) => {
              const content = edge.node.html
              return <article className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
            })}
        </div>
      </main>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(home)/" } }) {
      edges {
        node {
          id
          html
          frontmatter {
            language
          }
        }
      }
    }
  }
`
