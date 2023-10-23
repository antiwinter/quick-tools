import { Router } from 'preact-router'
import { routes, Home } from './routes'
import './app.css'

//get base from ../vite.config.js
export function App() {
  return (
    <div>
      <Router base={__BASE_URL__}>
        <Home path="/" />
        {routes.map(({ path, component: RouteComponent }) => (
          <RouteComponent path={path} />
        ))}
      </Router>
    </div>
  )
}
