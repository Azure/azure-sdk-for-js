// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

async function deploy(
  _serviceInformation: unknown,
  _name: string,
  _fallbackConfigPath: string,
): Promise<void> {
  throw new Error("Not supported in the browser environment.");
}

export default deploy;
