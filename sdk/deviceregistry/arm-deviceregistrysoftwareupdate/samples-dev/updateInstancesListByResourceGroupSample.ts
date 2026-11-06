// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns list of Update Instances.
 *
 * @summary returns list of Update Instances.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_ListByResourceGroup.json
 */
async function getsListOfUpdateInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateInstances.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfUpdateInstances();
}

main().catch(console.error);
