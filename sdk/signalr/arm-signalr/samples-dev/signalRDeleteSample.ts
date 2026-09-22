// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to delete a resource.
 *
 * @summary operation to delete a resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_Delete.json
 */
async function signalRDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalR.delete("myResourceGroup", "mySignalRService");
}

async function main(): Promise<void> {
  await signalRDelete();
}

main().catch(console.error);
