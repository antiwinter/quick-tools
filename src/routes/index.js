// src/routes/index.js

function importAll(r) {
  return Object.keys(r).map((key) => ({
    path: key.replace("./", "/").replace(".js", ""),
    component: r[key].default,
  }));
}

console.log(import.meta.globEager("./!(index).js"));
export const routes = importAll(import.meta.globEager("./!(index).js"));
