import { Router } from "preact-router";
import { routes } from "./routes";
import { Home } from "./routes/home";
import "./app.css";

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
  );
}
