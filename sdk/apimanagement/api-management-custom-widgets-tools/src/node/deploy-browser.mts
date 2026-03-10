// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeployConfig, ServiceInformation } from "./types.js";

async function deploy(
  _serviceInformation: ServiceInformation,
  _name: string,
  _fallbackConfigPath?: string,
  _config?: DeployConfig,
): Promise<void> {
  throw new Error("Not supported in the browser environment.");
}

export default deploy;
