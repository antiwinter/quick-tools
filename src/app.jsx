import { useState } from "preact/hooks";
import { Router, Link } from "preact-router";
import Home from "./routes/main";
import About from "./routes/about";

import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>

      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}
