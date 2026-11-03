// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to restart a replica.
 *
 * @summary operation to restart a replica.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Restart.json
 */
async function signalRReplicasRestart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRReplicas.restart(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  );
}

async function main() {
  await signalRReplicasRestart();
}

main().catch(console.error);
