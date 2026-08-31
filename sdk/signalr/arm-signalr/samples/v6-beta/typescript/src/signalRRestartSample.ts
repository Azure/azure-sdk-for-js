// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to restart a resource.
 *
 * @summary operation to restart a resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_Restart.json
 */
async function signalRRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalR.restart("myResourceGroup", "mySignalRService");
}

async function main(): Promise<void> {
  await signalRRestart();
}

main().catch(console.error);
