// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceInformation, Options, WidgetConfig } from "./scaffolding";

export async function generateProject(
  _widgetConfig: WidgetConfig,
  _deployConfig: ServiceInformation,
  _miscConfig: Options = {}
): Promise<void> {
  throw new Error("Only for Node.js");
}
