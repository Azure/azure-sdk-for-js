// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates NSP link resource.
 *
 * @summary creates or updates NSP link resource.
 * x-ms-original-file: 2025-05-01/NspLinkPut.json
 */
async function nspLinksPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLinks.createOrUpdate("rg1", "nsp1", "link1", {
    autoApprovedRemotePerimeterResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityPerimeters/nsp2",
    localInboundProfiles: ["*"],
    remoteInboundProfiles: ["*"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nspLinksPut();
}

main().catch(console.error);
