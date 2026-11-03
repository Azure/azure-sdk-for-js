// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the attached NetworkConnections for a DevCenter.
 *
 * @summary lists the attached NetworkConnections for a DevCenter.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_ListByDevCenter.json
 */
async function attachedNetworksListByDevCenter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attachedNetworks.listByDevCenter("rg1", "Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await attachedNetworksListByDevCenter();
}

main().catch(console.error);
