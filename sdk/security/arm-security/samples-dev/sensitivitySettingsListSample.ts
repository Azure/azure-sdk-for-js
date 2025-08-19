// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list with a single sensitivity settings resource
 *
 * @summary Gets a list with a single sensitivity settings resource
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-02-15-preview/examples/SensitivitySettings/GetSensitivitySettingsList_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSensitivitySettingsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.sensitivitySettings.list();
  console.log(result);
}

async function main(): Promise<void> {
  await getSensitivitySettingsList();
}

main().catch(console.error);
