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

export type TWidgetConfig = {
  displayName: string
  tech: TScaffoldTech
  control?: TScaffoldSourceControl
  iconUrl?: string
  deployed?: string
  override?: string | boolean
}

export type TDeployConfig = {
  managementApiEndpoint: string
  resourceId: string
  apiVersion: string
}

export const displayNameToName = (displayName: string) =>
 encodeURIComponent(displayName.normalize("NFD")
   .toLowerCase()
   .replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9-]/g, "-"));

export async function generateProject(
  widgetConfig: TWidgetConfig,
  deployConfig: TDeployConfig,
  openUrl?: string
): Promise<void> {
  const openUrlParsed = openUrl ? new URL(openUrl) : null
  if (openUrlParsed) openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT))

  const name = displayNameToName(widgetConfig.displayName)
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
    if (isTemplate) {
      fileData = mustache.render(fileData, {
        name,
        displayName: widgetConfig.displayName,
        config: JSON.stringify(widgetConfig, null, "\t"),
        configDeploy: JSON.stringify(deployConfig, null, "\t"),
        serverSettings,
      })
    }

    const relativePath = file
      .replace(/\//g, "\\")
      .replace(joinPath(__dirname, "templates", "_shared"), "")
      .replace(joinPath(__dirname, "templates", widgetConfig.tech), "")
      .replace(templateSuffix, "")
    const newFilePath = joinPath(process.cwd(), name, relativePath)
    const dir = parsePath(newFilePath).dir

    await fs.mkdir(dir, {recursive: true})
    await fs.writeFile(newFilePath, fileData)
  }

  const templates = await getTemplates(widgetConfig.tech)
  for (const file of Object.values(templates)) {
    await renderTemplate(file)
  }

  return
}
