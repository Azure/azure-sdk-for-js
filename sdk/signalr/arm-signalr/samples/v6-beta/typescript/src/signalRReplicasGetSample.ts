// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the replica and its properties.
 *
 * @summary get the replica and its properties.
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Get.json
 */
async function signalRReplicasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicas.get(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRReplicasGet();
}

main().catch(console.error);
