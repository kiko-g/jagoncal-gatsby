import { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(error)
    }
  }
  return [storedValue, setValue]
}

const usePageVisits = (path: string) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
