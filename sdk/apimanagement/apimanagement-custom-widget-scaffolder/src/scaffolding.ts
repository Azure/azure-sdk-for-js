// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { join as joinPath, parse as parsePath } from "path";
import { promises as fs } from "fs";
import { getTemplates } from "./getTemplates";
import mustache from "mustache";

/**
 * Unique identifier under which is specified which port to use for injecting locally hosted custom widget to a running DevPortal instance.
 */
export const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port";
/**
 * Default port for running local dev server on.
 */
export const OVERRIDE_DEFAULT_PORT = 3000;
const templateSuffix = ".mustache";

/** All supported technologies to scaffold a widget in. */
export type TScaffoldTech = "typescript" | "react"; // | "vue";
// export type TScaffoldSourceControl = "git" | "azure" | "none" | null;

export const technologies: TScaffoldTech[] = ["typescript", "react"];

/** Main data which DevPortal needs for every custom widget.  */
export interface TWidgetConfig {
  /** Name of the custom widget which is displayed in DevPortal. */
  displayName: string;
  /** Technology to use to scaffold the widget. */
  tech: TScaffoldTech;
  // control?: TScaffoldSourceControl;
  /** Optional URL for a custom icon, which will be displayed in DevPortal widget list. */
  iconUrl?: string;
}

/** Data needed for deployment. */
export interface TDeployConfig {
  /** Management API endpoint to use (e.g. management.azure.com). */
  managementApiEndpoint: string;
  /** resourceId of your APIM service, must be in this format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<service-name> */
  resourceId: string;
  /** optional override which API version to use during deployment */
  apiVersion?: string;
}

/** Miscellaneous data for scaffolding of a custom widget which will not be stored in DevPortal. */
export interface TMiscConfig {
  /** The URL to open after development server of the widget is started (URL of your Developer Portal). If you don't want to use this feature, set it to `false`. If you want to open just the widget page, set it to `true`. */
  openUrl?: string;
}

export type TConfigs = TWidgetConfig | TDeployConfig | TMiscConfig;

/**
 * Converts user defined name of a custom widget to a unique ID, which is in context of Dev Portal known as "name".
 *
 * @param displayName - User defined name of the custom widget.
 */
export const displayNameToName = (displayName: string): string =>
  encodeURIComponent(
    displayName
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9-]/g, "-")
  );

export const widgetFolderName = (name: string): string => `azure-api-management-widget-${name}`;

/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deployConfig - JSON object with data for deployment.
 * @param miscConfig - JSON object with other data, which will not be stored in the DevPortal.
 */
export async function generateProject(
  widgetConfig: TWidgetConfig,
  deployConfig: TDeployConfig,
  miscConfig: TMiscConfig = {}
): Promise<void> {
  const { openUrl } = miscConfig;
  const openUrlParsed = openUrl ? new URL(openUrl) : null;
  if (openUrlParsed) {
    openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT));
  }

  const name = displayNameToName(widgetConfig.displayName);
  const serverSettings = {
    port: OVERRIDE_DEFAULT_PORT,
    open: openUrlParsed ? openUrlParsed.toString() : true,
  };

  const renderTemplate = async (file: string): Promise<void> => {
    const isTemplate = file.endsWith(templateSuffix);
    let fileData = await fs.readFile(file, { encoding: "utf8" });
    if (isTemplate) {
      fileData = mustache.render(fileData, {
        name,
        displayName: widgetConfig.displayName,
        config: JSON.stringify(widgetConfig, null, "\t"),
        configDeploy: JSON.stringify(deployConfig, null, "\t"),
        serverSettings: JSON.stringify(serverSettings, null, "\t"),
      });
    }

    let relativePath = file;
    if (__dirname.includes("\\")) {
      relativePath = relativePath.replace(/\//g, "\\");
    }
    relativePath = relativePath
      .replace(joinPath(__dirname, "templates", "_shared"), "")
      .replace(joinPath(__dirname, "templates", widgetConfig.tech), "")
      .replace(templateSuffix, "");
    const newFilePath = joinPath(process.cwd(), widgetFolderName(name), relativePath);
    const dir = parsePath(newFilePath).dir;

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(newFilePath, fileData);
  };

  const templates = await getTemplates(widgetConfig.tech);
  for (const file of Object.values(templates)) {
    await renderTemplate(file);
  }

  return;
}
