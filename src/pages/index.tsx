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

  const links = [
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/jose-alberto-gon%C3%A7alves-55aba917/',
    },
    {
      name: 'Linkedin',
      href: 'https://linkedin.com/in/josealbertogoncalves',
    },
    {
      name: 'Linkedin',
      href: 'https://linkedin.com/in/josealbertogoncalves',
    },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en')
  }

  return (
    <Layout location="Home">
      <Seo title="Home" />
      <main className="home">
        {/* Header */}
        <header className="flex w-full items-start justify-between border-b border-gray-300 py-2 dark:border-white">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-4xl font-bold">José Alberto Gonçalves</h2>
            <ul className="flex flex-row items-center gap-x-2">
              {links.map((link, linkIdx) => (
                <li key={`external-link-${linkIdx}`}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="link">
                    {link.name}
                  </a>
                  {linkIdx === links.length - 1 ? null : <span className="ml-2">&middot;</span>}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={toggleLanguage} className="rounded p-2 transition hover:opacity-80">
            <TranslateIcon className="h-6 w-6 text-primary dark:text-tertiary" />
            <span>{language}</span>
          </button>
        </header>

        {/* Presentation */}
        {edges
          .filter(
            (edge: { node: { frontmatter: { language: string } } }) => edge.node.frontmatter.language === language
          )
          .map((edge: any) => {
            const content = edge.node.html
            return <article className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
          })}
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
