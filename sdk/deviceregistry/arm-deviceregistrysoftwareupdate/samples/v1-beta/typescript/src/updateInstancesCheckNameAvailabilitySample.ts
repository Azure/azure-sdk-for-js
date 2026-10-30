// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if the Update Instance name is available.
 *
 * @summary check if the Update Instance name is available.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_CheckNameAvailability.json
 */
async function checkUpdateInstanceNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const result = await client.updateInstances.checkNameAvailability({
    name: "contoso",
    type: "Microsoft.DeviceUpdate/updateInstances",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkUpdateInstanceNameAvailability();
}

main().catch(console.error);
