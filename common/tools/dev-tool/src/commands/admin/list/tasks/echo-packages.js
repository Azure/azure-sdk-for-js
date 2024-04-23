const path = require("path");

export default async function EchoPackage(project, paths, cwd, root) {
  console.dir({
    project,
    paths,
    cwd,
    root,
  });
}
