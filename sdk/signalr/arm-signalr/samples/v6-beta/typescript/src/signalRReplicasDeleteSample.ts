// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to delete a replica.
 *
 * @summary operation to delete a replica.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Delete.json
 */
async function signalRReplicasDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRReplicas.delete(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  );
}

async function main(): Promise<void> {
  await signalRReplicasDelete();
}

main().catch(console.error);
