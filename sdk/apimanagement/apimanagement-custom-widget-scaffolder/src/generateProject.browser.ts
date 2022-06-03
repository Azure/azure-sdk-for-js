// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TDeployConfig, TMiscConfig, TWidgetConfig } from "./scaffolding";

export async function generateProject(
  _widgetConfig: TWidgetConfig,
  _deployConfig: TDeployConfig,
  _miscConfig: TMiscConfig = {}
): Promise<void> {
  throw new Error("Only for Node.js");
}
