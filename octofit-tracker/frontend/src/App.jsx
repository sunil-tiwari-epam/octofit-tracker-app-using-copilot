import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

const navigation = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Octofit Tracker</h1>
          <p className="subtitle">
            Use <code>react-router-dom</code> for navigation and connect to the
            backend via Vite runtime env variables.
          </p>
          <p className="meta">
            API host:
            <strong>{' ' + apiHost}</strong>
          </p>
          {!codespaceName && (
            <p className="warning">
              VITE_CODESPACE_NAME is not defined. Add it in{' '}
              <code>.env.local</code> to use GitHub Codespaces URLs.
            </p>
          )}
        </div>
        <nav className="app-nav">
          {navigation.map((nav) => (
            <Link key={nav.path} to={nav.path} className="nav-link">
              {nav.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities apiHost={apiHost} />} />
          <Route path="/leaderboard" element={<Leaderboard apiHost={apiHost} />} />
          <Route path="/teams" element={<Teams apiHost={apiHost} />} />
          <Route path="/users" element={<Users apiHost={apiHost} />} />
          <Route path="/workouts" element={<Workouts apiHost={apiHost} />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
