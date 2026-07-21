// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a replica.
 *
 * @summary create or update a replica.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_CreateOrUpdate.json
 */
async function signalRReplicasCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicas.createOrUpdate(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
    {
      location: "eastus",
      resourceStopped: "false",
      sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRReplicasCreateOrUpdate();
}

main().catch(console.error);
