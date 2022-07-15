// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TDeploymentConfig, TOptions, TWidgetConfig } from "./scaffolding";

export async function generateProject(
  _widgetConfig: TWidgetConfig,
  _deployConfig: TDeploymentConfig,
  _miscConfig: TOptions = {}
): Promise<void> {
  throw new Error("Only for Node.js");
}
