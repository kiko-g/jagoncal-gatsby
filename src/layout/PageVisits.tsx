import React from 'react'

type Props = {
  visits: number
}

const PageVists = ({ visits }: Props) => {
  const validVisits = isNaN(visits) || visits < 1

  return validVisits ? null : (
    <div className="flex items-center justify-between">
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        <span className="whitespace-nowrap">
          Page Visits: <strong>{visits}</strong>
        </span>
      </p>
    </div>
  )
}

export default PageVists
