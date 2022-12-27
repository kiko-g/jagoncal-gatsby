import React from 'react'

type Props = {
  title: string
  location?: string
}

const Footer = ({ title, location }: Props) => {
  return (
    <footer className="z-10 flex items-center justify-between p-2 text-xs text-gray-500 opacity-80 dark:text-gray-300 md:p-3 md:text-sm">
      <div></div>
    </footer>
  )
}

export default Footer
