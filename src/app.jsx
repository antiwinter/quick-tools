import { Router } from 'preact-router'
import { routes, Home } from './routes'
import './app.css'

console.log('router base', __BASE_URL__)
//get base from ../vite.config.js
export function App() {
  return (
    <div>
      <Router>
        <Home path="/" />
        {routes.map(({ path, component: RouteComponent }) => (
          <RouteComponent path={path} />
        ))}
      </Router>
    </div>
  )
}
