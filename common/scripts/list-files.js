const fs = require("fs");
const path = require("path");

function read(filename) {
  const txt = fs
    .readFileSync(filename, "utf8")
    .replace(/\r/gm, "")
    .replace(/\n/gm, "«")
    .replace(/\/\*.*?\*\//gm, "")
    .replace(/«/gm, "\n")
    .replace(/\s+\/\/.*/g, "");
  return JSON.parse(txt);
}

function walk(dir) {
  var list = fs.readdirSync(dir);
  for (const fileName of list) {
    const filePath = path.join(dir, fileName);
    if (fileName == "node_modules") {
      continue;
    }

    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath);
    } else {
      console.log(path.resolve(filePath));
    }
  }
}

const rush = read(`${__dirname}/../../rush.json`);
for (const each of rush.projects) {
  walk(each.projectFolder);
}
