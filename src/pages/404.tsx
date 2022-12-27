import React from 'react'
import { Link } from 'gatsby'
import { Layout, Seo } from '../layout'
import '../styles/pages/404.css'

const NotFoundPage = () => (
  <Layout location="Oops!">
    <Seo title="Oops!" />
    <main className="not-found">
      <h1>404: Not found</h1>
      <p>Nothing to see here!</p>
      <Link to="/" className="link">
        Go back home
      </Link>
    </main>
  </Layout>
)

export default NotFoundPage
