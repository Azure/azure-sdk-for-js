// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets data sensitivity settings for sensitive data discovery
 *
 * @summary Gets data sensitivity settings for sensitive data discovery
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-02-15-preview/examples/SensitivitySettings/GetSensitivitySettings_example.json
 */
async function getSensitivitySettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.getSensitivitySettings();
  console.log(result);
}

async function main(): Promise<void> {
  await getSensitivitySettings();
}

main().catch(console.error);
