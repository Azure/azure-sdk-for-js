// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OVERRIDE_DEFAULT_PORT,
  OVERRIDE_PORT_KEY,
  TDeployConfig,
  TMiscConfig,
  TWidgetConfig,
  displayNameToName,
  widgetFolderName,
} from "./scaffolding";
import { join as joinPath, parse as parsePath } from "path";
import { promises as fs } from "fs";
import { getTemplates } from "./getTemplates";
import mustache from "mustache";

const templateSuffix = ".mustache";

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
        config: JSON.stringify({ ...widgetConfig, name }, null, "\t"),
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
