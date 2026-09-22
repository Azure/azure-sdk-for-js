// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all available skus of the replica resource.
 *
 * @summary list all available skus of the replica resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_ListReplicaSkus.json
 */
async function signalRListReplicaSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.listReplicaSkus(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  );
  console.log(result);
}

async function main() {
  await signalRListReplicaSkus();
}

main().catch(console.error);
