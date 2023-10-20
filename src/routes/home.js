import { Router, Link } from "preact-router";

export function Home() {
  return (
    <div>
      <nav>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
