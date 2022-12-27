import React, { useState } from 'react'
import { Layout, Seo, PageVisits } from '../layout'
import usePageVisits from '../hooks/usePageVisits'
import '../styles/pages/home.css'

const HomePage = () => {
  const domainVisits = usePageVisits('')

  return (
    <Layout location="Home">
      <Seo title="Home" />
      <main className="home"></main>
    </Layout>
  )
}

export default HomePage
