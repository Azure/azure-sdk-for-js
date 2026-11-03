// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an attached NetworkConnection.
 *
 * @summary creates or updates an attached NetworkConnection.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_Create.json
 */
async function attachedNetworksCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.attachedNetworks.createOrUpdate("rg1", "Contoso", "network-uswest3", {
    networkConnectionId:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/NetworkConnections/network-uswest3",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await attachedNetworksCreate();
}

main().catch(console.error);
