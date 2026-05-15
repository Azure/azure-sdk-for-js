// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a flow log for the specified network security group.
 *
 * @summary create or update a flow log for the specified network security group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogCreate.json
 */
async function createOrUpdateFlowLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.flowLogs.createOrUpdate("rg1", "nw1", "fl", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "centraluseuap",
    format: { type: "JSON", version: 1 },
    enabled: true,
    enabledFilteringCriteria: "srcIP=158.255.7.8 || dstPort=56891",
    recordTypes: "B,E",
    storageId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/nwtest1mgvbfmqsigdxe",
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/desmondcentral-nsg",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateFlowLog();
}

main().catch(console.error);
