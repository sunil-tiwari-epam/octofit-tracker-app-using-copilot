import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const DEFAULT_API_HOST = 'http://localhost:8000'

function normalizeApiResponse(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  if (value.data) return normalizeApiResponse(value.data)
  if (value.items) return normalizeApiResponse(value.items)
  if (value.results) return normalizeApiResponse(value.results)
  if (typeof value === 'object') return [value]
  return []
}

function renderValue(value) {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function buildRows(items) {
  if (!items.length) return null
  const headers = Object.keys(items[0] || {})
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>
                {renderValue(item[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Leaderboard({ apiHost }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url = apiHost
    ? `${apiHost}/api/leaderboard/`
    : CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : `${DEFAULT_API_HOST}/api/leaderboard/`

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then((json) => {
        if (!cancelled) {
          setItems(normalizeApiResponse(json))
        }
      })
      .catch((fetchError) => {
        if (!cancelled) {
          setError(fetchError.message)
          setItems([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <section className="page">
      <h1>Leaderboard</h1>
      <p className="meta">
        Loaded from <code>{url}</code>
      </p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">Error loading leaderboard: {error}</p>}
      {!loading && !error && items.length === 0 && <p>No leaderboard entries were found.</p>}
      {!loading && !error && items.length > 0 && buildRows(items)}
    </section>
  )
}

export default Leaderboard
