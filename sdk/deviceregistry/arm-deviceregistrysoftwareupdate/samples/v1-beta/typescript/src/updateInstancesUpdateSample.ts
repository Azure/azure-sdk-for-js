// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates update instance's patchable properties.
 *
 * @summary updates update instance's patchable properties.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_Update.json
 */
async function updatesUpdateInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const result = await client.updateInstances.update("test-rg", "contoso", {
    tags: { tagKey: "tagValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesUpdateInstance();
}

main().catch(console.error);
