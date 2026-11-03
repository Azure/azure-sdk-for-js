// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to restart a replica.
 *
 * @summary operation to restart a replica.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Restart.json
 */
async function signalRReplicasRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRReplicas.restart(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  );
}

async function main(): Promise<void> {
  await signalRReplicasRestart();
}

main().catch(console.error);
