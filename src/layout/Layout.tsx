import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Navbar, Footer } from '.'

type Props = {
  children: any
  location: string
}

const Layout = ({ children, location }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || 'Site Title'

  return (
    <div className="flex min-h-screen flex-col overflow-clip bg-ice font-prose font-medium text-gray-800 dark:bg-navy dark:text-white">
      <div className="mx-auto w-full max-w-7xl">
        <Navbar title={siteTitle} location={location} />
        <div className="container z-10 mx-auto my-auto px-4 py-4 min-h-adjusted">{children}</div>
        <Footer title={siteTitle} location={location} />
      </div>
    </div>
  )
}

Layout.defaultProps = {
  location: 'Unknown',
}

export default Layout
