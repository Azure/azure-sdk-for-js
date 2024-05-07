// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ServiceInformation,
  OVERRIDE_DEFAULT_PORT,
  OVERRIDE_PORT_KEY,
  Options,
  WidgetConfig,
  displayNameToName,
  widgetFolderName,
} from "./scaffolding.js";
import { sourceDir } from "./sourceDir.js";
import { join as joinPath, parse as parsePath } from "node:path";
import * as fs from "node:fs/promises";
import { getTemplates } from "./getTemplates.js";
import mustache from "mustache";

const templateSuffix = ".mustache";

/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deploymentConfig - JSON object with data for deployment.
 * @param options - JSON object with other data, which will not be stored in the DevPortal.
 */
export async function generateProject(
  widgetConfig: WidgetConfig,
  deploymentConfig: ServiceInformation,
  options: Options = {},
): Promise<void> {
  const { openUrl, configAdvancedTenantId, configAdvancedRedirectUri } = options;
  const openUrlParsed = openUrl ? new URL(openUrl) : null;
  if (openUrlParsed) {
    openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT));
  }

  const name = displayNameToName(widgetConfig.displayName);
  const serverSettings = {
    port: OVERRIDE_DEFAULT_PORT,
    open: openUrlParsed ? openUrlParsed.toString() : true,
  };

  const configAdditional = {
    interactiveBrowserCredentialOptions: { redirectUri: "http://localhost:1337" } as {
      redirectUri: string;
      tenantId?: string;
    },
  };
  if (configAdvancedTenantId) {
    configAdditional.interactiveBrowserCredentialOptions.tenantId = configAdvancedTenantId;
  }
  if (configAdvancedRedirectUri) {
    configAdditional.interactiveBrowserCredentialOptions.redirectUri = configAdvancedRedirectUri;
  }

  const renderTemplate = async (file: string): Promise<void> => {
    const isTemplate = file.endsWith(templateSuffix);
    const encoding = file.endsWith(".ttf") ? "binary" : "utf8";
    let fileData = await fs.readFile(file, { encoding });
    if (isTemplate) {
      fileData = mustache.render(fileData, {
        name,
        displayName: widgetConfig.displayName,
        config: JSON.stringify({ ...widgetConfig, name }, null, "\t"),
        configDeploy: JSON.stringify(deploymentConfig, null, "\t"),
        configAdditional: JSON.stringify(configAdditional, null, "\t"),
        serverSettings: JSON.stringify(serverSettings, null, "\t"),
      });
    }

    let relativePath = file;
    if (sourceDir.includes("\\")) {
      relativePath = relativePath.replace(/\//g, "\\");
    }
    relativePath = relativePath
      .replace(joinPath(sourceDir, "..", "templates", "_shared"), "")
      .replace(joinPath(sourceDir, "..", "templates", widgetConfig.technology), "")
      .replace(templateSuffix, "");
    const newFilePath = joinPath(process.cwd(), widgetFolderName(name), relativePath);
    const dir = parsePath(newFilePath).dir;

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(newFilePath, fileData, { encoding });
  };

  const templates = await getTemplates(widgetConfig.technology);
  for (const file of Object.values(templates)) {
    await renderTemplate(file);
  }

  return;
}
