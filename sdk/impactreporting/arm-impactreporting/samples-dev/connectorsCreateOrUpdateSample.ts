// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Connector
 *
 * @summary create a Connector
 * x-ms-original-file: 2026-01-01-preview/Connectors_CreateOrUpdate.json
 */
async function createConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74f5e23f-d4d9-410a-bb4d-8f0608adb10d";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.connectors.createOrUpdate("testconnector1", {
    properties: { connectorType: "AzureMonitor" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createConnector();
}

main().catch(console.error);
