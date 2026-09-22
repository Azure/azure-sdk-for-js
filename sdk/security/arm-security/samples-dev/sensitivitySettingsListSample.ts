// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list with a single sensitivity settings resource
 *
 * @summary gets a list with a single sensitivity settings resource
 * x-ms-original-file: 2023-02-15-preview/SensitivitySettings/GetSensitivitySettingsList_example.json
 */
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
