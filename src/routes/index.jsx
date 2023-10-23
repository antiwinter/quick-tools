// src/routes/index.js
import { Link } from 'preact-router'

let r = import.meta.globEager('./!(index).jsx')
export const routes = Object.keys(r).map(k => {
  let name = k.replace('./', '').replace('.jsx', '')
  return {
    name,
    path: __BASE_URL__ + name,
    component: r[k].Main
  }
})

console.log(routes)

export function Home() {
  return (
    <div>
      <nav>
        {
          // add a link to each route
          routes.map(r => (
            <div key={r.path}>
              <Link href={r.path}>{r.name}</Link>
            </div>
          ))
        }
      </nav>
    </div>
  )
}
