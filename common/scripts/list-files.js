const fs = require("fs");
const path = require("path");
const parse = require("../lib/jju/parse").parse;

function read(filename) {
  const txt = fs.readFileSync(filename, "utf8");
  return parse(txt);
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
