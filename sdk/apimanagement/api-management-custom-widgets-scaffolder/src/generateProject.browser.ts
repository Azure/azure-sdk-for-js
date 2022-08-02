// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeploymentConfig, Options, WidgetConfig } from "./scaffolding";

export async function generateProject(
  _widgetConfig: WidgetConfig,
  _deployConfig: DeploymentConfig,
  _miscConfig: Options = {}
): Promise<void> {
  throw new Error("Only for Node.js");
}
