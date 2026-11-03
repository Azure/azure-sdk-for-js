// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets data sensitivity settings for sensitive data discovery
 *
 * @summary gets data sensitivity settings for sensitive data discovery
 * x-ms-original-file: 2023-02-15-preview/SensitivitySettings/GetSensitivitySettings_example.json
 */
async function getSensitivitySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.sensitivitySettings.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getSensitivitySettings();
}

main().catch(console.error);
