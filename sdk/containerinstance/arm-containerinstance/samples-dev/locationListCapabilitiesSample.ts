// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of CPU/memory/GPU capabilities of a region.
 *
 * @summary get the list of CPU/memory/GPU capabilities of a region.
 * x-ms-original-file: 2026-07-01/CapabilitiesList.json
 */
async function getCapabilities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listCapabilities("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getCapabilities();
}

main().catch(console.error);
