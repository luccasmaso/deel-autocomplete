import { useEffect, useState } from "react"
import Autocomplete from "../Autocomplete/Autocomplete"

export default function Demo() {
  const [error, setError] = useState<boolean>()
  const [topAlbums, setTopAlbums] = useState<string[]>([])

  function fetchTopAlbums() {
    const controller = new AbortController()
    const getTopAlbums = async () => {
      try {
        const response = await fetch(`/api/top-albums`, { signal: controller.signal })  
        const data = await response.json()
        setTopAlbums(data)
      } catch {
        setError(true)
      }
    }

    getTopAlbums()
    
    return () => controller.abort()
  }

  useEffect(() => fetchTopAlbums(), [])

  return (
    <div>
      <h3>Autocomplete</h3>

      <Autocomplete 
        inputPlaceholder='Search "Albums You Must Hear Before You Die"...' 
        options={topAlbums} 
      />

      {error && <><br/>List could not be loaded.</>}
    </div>
  )
}