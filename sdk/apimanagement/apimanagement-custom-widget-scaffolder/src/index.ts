// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import JSZip from "jszip"
import mustache from "mustache"
import templates from "virtual:templates"

export const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port"
export const OVERRIDE_DEFAULT_PORT = 3000

export type TTech = "typescript" | "react" | "vue"
export type TControl = "git" | "azure" | "none" | null

export type TemplateFile = {
  dir: string;
  name: string;
  fileData: string;
  isTemplate: boolean;
  encoding?: BufferEncoding;
}

export type TConfigData = {
  name: string;
  displayName: string;
  tech: TTech;
  control?: TControl;
}

export type TCustomWidgetConfig = {
  name: string;
  displayName: string;
  category: string;
  iconUrl?: string;
  tech: TTech;
  control?: TControl;
  deployed?: string;
  override?: string | boolean;
}

export type TConfigDeploy = {
  subscriptionId: string,
  resourceGroupName: string
  serviceName: string,
  managementApiEndpoint: string,
  apiVersion: string,

  openUrl?: string;
}

export type TGenerate<TData> = (config: TCustomWidgetConfig, deploy: TConfigDeploy) => Promise<TData>

function goToFolder(path: string, zip: JSZip): JSZip {
  let resZip = zip

  for (const dir of path.split("/")) {
    if (dir === "") continue
    resZip = resZip.folder(dir) ?? zip
  }

  return resZip
}

export const generateArchive: TGenerate<JSZip> = async (customWidgetConfig, {openUrl, ...configDeploy}) => {
  const zip = new JSZip()

  const openUrlParsed = openUrl ? new URL(openUrl) : null
  if (openUrlParsed) openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT))

  const serverSettings = JSON.stringify({
    port: OVERRIDE_DEFAULT_PORT,
    open: openUrlParsed ? openUrlParsed.toString() : true,
  }, null, "\t")

  const renderTemplate = ({dir, name, fileData, isTemplate, encoding}: TemplateFile): void => {
    const dirForFile = dir !== "" ? goToFolder(dir, zip) : zip
    dirForFile.file(name, !isTemplate ? fileData : mustache.render(fileData, {
      name: customWidgetConfig.name,
      displayName: customWidgetConfig.displayName,
      config: JSON.stringify(customWidgetConfig, null, "\t"),
      configDeploy: JSON.stringify(configDeploy, null, "\t"),
      serverSettings,
    }), {
      base64: encoding === "base64",
      binary: encoding === "binary",
    })
  }

  Object.values(templates._shared).forEach(renderTemplate)
  Object.values(templates[customWidgetConfig.tech]).forEach(renderTemplate)

  return zip
}

export const generateBlob: TGenerate<Blob> = async (customWidgetConfig, configDeploy) => (
  generateArchive(customWidgetConfig, configDeploy)
      .then(zip => zip.generateAsync({type: "blob"}))
)

export async function scaffold(config: TConfigData, configDeploy: TConfigDeploy): Promise<{config: TCustomWidgetConfig, blob: Blob}> {
  const customWidgetConfig = {
    ...config,
    category: "Custom widgets",
  }

  return {
    config: customWidgetConfig,
    blob: await generateBlob(customWidgetConfig, configDeploy),
  }
}

export default scaffold
