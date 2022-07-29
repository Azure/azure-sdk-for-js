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
} from "./scaffolding";
export { generateProject } from "./generateProject";
export type {
  TWidgetConfig as TCustomWidgetCommonConfig,
  TDeploymentConfig,
  TOptions,
  // TScaffoldSourceControl,
  TScaffoldTech,
} from "./scaffolding";
