// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an interconnect group.
 *
 * @summary creates or updates an interconnect group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupCreate.json
 */
async function createInterconnectGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.interconnectGroups.createOrUpdate("rg1", "test-ig", {
    properties: {
      scope: "InfiniBand",
      subgroupProfile: {
        vmSize: "Standard_ND128isr_NDR_GB200_v6",
        scope: "VerticalConnect",
        size: 18,
      },
    },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createInterconnectGroup();
}

main().catch(console.error);
