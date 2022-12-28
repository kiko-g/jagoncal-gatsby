import React from 'react'
import { Link } from 'gatsby'
import { Layout, Seo } from '../layout'
import '../styles/pages/another.css'

const AnotherPage = () => (
  <Layout location="Another">
    <Seo title="Another" />
    <main className="another">
      <div></div>
    </main>
  </Layout>
)

export default AnotherPage
