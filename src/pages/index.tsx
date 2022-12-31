import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { Layout, Seo } from '../layout'
import { LanguageIcon } from '@heroicons/react/24/outline'
import '../styles/pages/home.css'

const HomePage = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  const email = process.env.GATSBY_EMAIL || 'jagoncal@fc.up.pt'
  const linkedinId = process.env.GATSBY_LINKEDIN || 'jose-alberto-gon%C3%A7alves-55aba917'

  const links = [
    {
      name: 'Linkedin',
      href: `https://www.linkedin.com/in/${linkedinId}`,
    },
    {
      name: 'Resume',
      href: 'https://google.com',
    },
    {
      name: 'Email',
      href: `mailto:${email}`,
    },
  ]

  const [language, setLanguage] = useState('en')

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
            <LanguageIcon className="h-6 w-6 text-primary dark:text-tertiary" />
            <span>{language}</span>
          </button>
        </header>

        {/* Presentation */}
        {nodes
          .filter((node: { frontmatter: { language: string } }) => node.frontmatter.language === language)
          .map((node: any, nodeIdx: number) => {
            const content = node.html
            return (
              <article
                key={`article-${nodeIdx}`}
                className="markdown bg-lightest px-4 py-4 dark:bg-gray-800"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )
          })}
      </main>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(home)/" } }) {
      nodes {
        id
        html
        frontmatter {
          language
        }
      }
    }
  }
`
