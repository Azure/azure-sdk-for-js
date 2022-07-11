const fs = require("fs")
const path = require("path")

function readdir(dir, root) {
  const results = []

  fs.readdirSync(root + dir).forEach(file => {
    const stat = fs.statSync(root + dir + path.sep + file)
    if (stat && stat.isDirectory()) {
      results.push(...readdir(dir + file + path.sep, root))
    } else {
      results.push(dir + file)
    }
  })

  return results
}

module.exports = readdir
