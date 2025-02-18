import { useEffect, useState } from 'react'

export const useDebounceValue = ({ value, delay = 300 }: { value: string; delay?: number }) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}
