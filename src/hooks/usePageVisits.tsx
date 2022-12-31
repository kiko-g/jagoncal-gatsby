import { useEffect, useState } from 'react'

const usePageVisits = (location: string) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const path = location === 'Home' ? '' : location.toLowerCase()
    const page = path[0] === '/' ? path.slice(1, path.length) : path
    const website = process.env.GATSBY_WEBSITE_URL || 'jagoncal.com'
    const operation = process.env.NODE_ENV === 'development' ? 'get' : 'hit'
    const count_url = `https://api.countapi.xyz/${operation}/${website}/${page}`

    fetch(count_url)
      .then(response => response.json())
      .then(response => setCount(parseInt(response.value)))
  }, [])

  return count
}

export default usePageVisits
