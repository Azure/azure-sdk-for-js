// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {join as joinPath, parse as parsePath} from "path"

import {promises as fs} from "fs"
// import JSZip from "jszip"
import {getTemplates} from "./getTemplates"
import mustache from "mustache"

export const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port"
export const OVERRIDE_DEFAULT_PORT = 3000
const templateSuffix = ".mustache"

export type TScaffoldTech = "typescript" | "react" | "vue"
export type TScaffoldSourceControl = "git" | "azure" | "none" | null

export type TemplateFile = {
  dir: string
  name: string
  fileData: string
  isTemplate: boolean
  encoding?: BufferEncoding
}

export type TConfigData = {
  name: string
  displayName: string
  tech: TScaffoldTech
  control?: TScaffoldSourceControl
}

export type TCustomWidgetConfig = {
  name: string
  displayName: string
  category: string
  iconUrl?: string
  tech: TScaffoldTech
  control?: TScaffoldSourceControl
  deployed?: string
  override?: string | boolean
}

export type TConfigDeploy = {
  subscriptionId: string
  resourceGroupName: string
  serviceName: string
  managementApiEndpoint: string
  apiVersion: string

  openUrl?: string
}

export type TGenerate<TData> = (config: TCustomWidgetConfig, deploy: TConfigDeploy) => Promise<TData>

// function goToFolder(path: string, zip: JSZip): JSZip {
//   let resZip = zip

//   for (const dir of path.split("/")) {
//     if (dir === "") continue
//     resZip = resZip.folder(dir) ?? zip
//   }

//   return resZip
// }

export const generateProject: TGenerate<void> = async (customWidgetConfig, {openUrl, ...configDeploy}) => {
  const openUrlParsed = openUrl ? new URL(openUrl) : null
  if (openUrlParsed) openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT))

  const serverSettings = JSON.stringify(
    {
      port: OVERRIDE_DEFAULT_PORT,
      open: openUrlParsed ? openUrlParsed.toString() : true,
    },
    null,
    "\t"
  )

  const renderTemplate = async (file: string) => {
    const isTemplate = file.endsWith(templateSuffix)
    const fileData = await fs.readFile(file, {encoding: "utf8"})

    const jsZipData = !isTemplate
      ? fileData
      : mustache.render(fileData, {
          name: customWidgetConfig.name,
          displayName: customWidgetConfig.displayName,
          config: JSON.stringify(customWidgetConfig, null, "\t"),
          configDeploy: JSON.stringify(configDeploy, null, "\t"),
          serverSettings,
        })

    // const encodingOptions: Partial<Record<BufferEncoding, JSZip.JSZipFileOptions>> = {
    //   base64: {base64: true},
    //   binary: {binary: true},
    // }
    // const jsZipOptions = encoding ? encodingOptions[encoding] : undefined

    // const dirForFile = file.dfi !== "" ? goToFolder(dir, zip) : zip
    // dirForFile.file(name, jsZipData, jsZipOptions)
    const relativePath = file
      .replace(joinPath(__dirname, "templates", "_shared"), "")
      .replace(joinPath(__dirname, "templates", customWidgetConfig.tech), "")
      .replace(templateSuffix, "")
    const newFilePath = joinPath(process.cwd(), customWidgetConfig.name, relativePath)
    const dir = parsePath(newFilePath).dir

    await fs.mkdir(dir, {recursive: true})
    await fs.writeFile(newFilePath, jsZipData)
  }
  const templates = await getTemplates(customWidgetConfig.tech)
  for (const file of Object.values(templates)) {
    await renderTemplate(file)
  }

  return
}

// export const generateBlob: TGenerate<Blob> = async (customWidgetConfig, configDeploy) =>
//   generateArchive(customWidgetConfig, configDeploy).then(zip => zip.generateAsync({type: "blob"}))

// export async function scaffold(
//   config: TConfigData,
//   configDeploy: TConfigDeploy
// ): Promise<{config: TCustomWidgetConfig; blob: Blob}> {
//   const customWidgetConfig = {
//     ...config,
//     category: "Custom widgets",
//   }

//   return {
//     config: customWidgetConfig,
//     blob: await generateBlob(customWidgetConfig, configDeploy),
//   }
// }
