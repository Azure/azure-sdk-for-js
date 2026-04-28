// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all VM families for the subscription at the specified location.
 *
 * @summary lists all VM families for the subscription at the specified location.
 * x-ms-original-file: 2026-04-30/VmFamilies_List.json
 */
async function listVMFamilies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmFamilies.listBySubscriptionLocationResource("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVMFamilies();
}

main().catch(console.error);
