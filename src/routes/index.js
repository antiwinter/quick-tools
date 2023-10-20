// src/routes/index.js
import { Link } from 'preact-router'

let r = import.meta.globEager('./!(index).js')
export const routes = Object.keys(r).map(k => {
  let name = k.replace('./', '').replace('.js', '')
  return {
    name,
    path: '/' + name,
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
            <Link href={r.path}>{r.name}</Link>
          ))
        }
      </nav>
    </div>
  )
}
