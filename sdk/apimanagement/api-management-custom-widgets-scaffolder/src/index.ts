// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @packageDocumentation https://aka.ms/apimdocs/portal/customwidgets
 */

export {
  OVERRIDE_PORT_KEY,
  OVERRIDE_DEFAULT_PORT,
  TECHNOLOGIES,
  displayNameToName,
  widgetFolderName,
} from "./scaffolding.js";
export { generateProject } from "./generateProject.js";
export type {
  WidgetConfig as CustomWidgetCommonConfig,
  ServiceInformation as DeploymentConfig,
  Options,
  ScaffoldTech,
} from "./scaffolding.js";
