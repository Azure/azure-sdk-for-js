import glob from "glob"
import {join as pathJoin} from "path"

export async function getTemplates(template: "react" | "typescript" | "vue"): Promise<string[]> {
  const sharedFiles = await getFiles(pathJoin(__dirname, "templates", "_shared", "**", "**", "*.*"))
  const templateFiles = await getFiles(pathJoin(__dirname, "templates", template, "**", "**", "*.*"))
  return [...sharedFiles, ...templateFiles]
}

async function getFiles(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(path, (error, matches) => {
      if (error) {
        reject(error)
      }
      resolve(matches)
    })
  })
}

getTemplates("react")
