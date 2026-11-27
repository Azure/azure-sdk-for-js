// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an update instance.
 *
 * @summary deletes an update instance.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_Delete.json
 */
async function deletesAnUpdateInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  await client.updateInstances.delete("test-rg", "contoso");
}

async function main(): Promise<void> {
  await deletesAnUpdateInstance();
}

main().catch(console.error);
