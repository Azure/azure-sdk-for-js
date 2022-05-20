// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {join as joinPath, parse as parsePath} from "path"
import {promises as fs} from "fs"
import mustache from "mustache"
import {getTemplates} from "./getTemplates"

export const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port"
export const OVERRIDE_DEFAULT_PORT = 3000
const templateSuffix = ".mustache"

export type TScaffoldTech = "typescript" | "react" | "vue"
export type TScaffoldSourceControl = "git" | "azure" | "none" | null

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
}

export async function generateProject(
  customWidgetConfig: TCustomWidgetConfig,
  configDeploy: TConfigDeploy,
  openUrl?: string
): Promise<void> {
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
    let fileData = await fs.readFile(file, {encoding: "utf8"})
    if (!isTemplate) {
      fileData = mustache.render(fileData, {
        name: customWidgetConfig.name,
        displayName: customWidgetConfig.displayName,
        config: JSON.stringify(customWidgetConfig, null, "\t"),
        configDeploy: JSON.stringify(configDeploy, null, "\t"),
        serverSettings,
      })
    }

    const relativePath = file
      .replace(joinPath(__dirname, "templates", "_shared"), "")
      .replace(joinPath(__dirname, "templates", customWidgetConfig.tech), "")
      .replace(templateSuffix, "")
    const newFilePath = joinPath(process.cwd(), customWidgetConfig.name, relativePath)
    const dir = parsePath(newFilePath).dir

    await fs.mkdir(dir, {recursive: true})
    await fs.writeFile(newFilePath, fileData)
  }

  const templates = await getTemplates(customWidgetConfig.tech)
  for (const file of Object.values(templates)) {
    await renderTemplate(file)
  }

  return
}
