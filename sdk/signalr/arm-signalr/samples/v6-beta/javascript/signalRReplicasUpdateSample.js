// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an exiting replica.
 *
 * @summary operation to update an exiting replica.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Update.json
 */
async function signalRReplicasUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicas.update(
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

async function main() {
  await signalRReplicasUpdate();
}

main().catch(console.error);
