import React from 'react'
import { PageVisits } from '.'
import usePageVisits from '../hooks/usePageVisits'

type Props = {
  title: string
  location: string
}

const Footer = ({ title, location }: Props) => {
  const year = new Date().getFullYear()
  const profession = process.env.GATSBY_JOB || 'Job Title'

  const domainVisits = usePageVisits('')

  return (
    <footer className="z-10 flex items-center justify-between p-2 text-xs text-gray-600 opacity-80 dark:text-gray-200 md:p-3 md:text-sm">
      <div>
        {title}, {year} | {profession}
      </div>
      <div className="flex">
        <PageVisits visits={domainVisits} />
      </div>
    </footer>
  )
}

export default Footer
