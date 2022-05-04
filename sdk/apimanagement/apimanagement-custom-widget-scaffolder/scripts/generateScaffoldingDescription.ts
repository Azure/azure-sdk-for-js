import * as fs from "fs"

interface TemplateFile {
  dir: string;
  name: string;
  fileData: string;
  isTemplate: boolean;
  encoding?: BufferEncoding;
}

const templateSuffix = ".mustache"

function getScaffoldTypes(root: string): string[] {
  const projectTemplates = []

  const dir = fs.opendirSync(root)
  let item: fs.Dirent | null
  while (item = dir.readSync()) {
    if (item.isDirectory()) {
      projectTemplates.push(item.name)
    }
  }
  dir.closeSync()

  return projectTemplates
}

function getScaffoldFiles(basePath: string): TemplateFile[] {
  const dirQueue = [basePath]
  const fileList = []
  while (dirQueue.length > 0) {
    const path = dirQueue.pop() as string
    const dir = fs.opendirSync(path)

    let item: fs.Dirent | null
    while (item = dir.readSync()) {
      const itemPath = `${path}/${item.name}`

      if (item.isDirectory()) {
        dirQueue.push(itemPath)
      } else if (item.isFile()) {
        const encoding: BufferEncoding | undefined = item.name.endsWith("ttf") ? "base64" : undefined
        fileList.push({
          dir: path.replace(basePath, ""),
          name: item.name.replace(templateSuffix, ""),
          fileData: fs.readFileSync(itemPath, {encoding}).toString(),
          isTemplate: item.name.endsWith(templateSuffix),
          encoding,
        })
      }
    }
    dir.close()
  }
  return fileList
}

function generateScaffoldingDescription(rootPath: string) {
  return getScaffoldTypes(rootPath)
    .reduce((acc, cur) => {
      acc[cur] = getScaffoldFiles(`${rootPath}/${cur}`)
      return acc
    }, {} as Record<string, TemplateFile[]>)
}

export default generateScaffoldingDescription
