import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

import { Buffer } from 'buffer'
window.Buffer = Buffer

render(<App />, document.getElementById('app'))
