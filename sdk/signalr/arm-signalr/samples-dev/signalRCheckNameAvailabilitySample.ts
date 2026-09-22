// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the resource name is valid and is not already in use.
 *
 * @summary checks that the resource name is valid and is not already in use.
 * x-ms-original-file: 2025-01-01-preview/SignalR_CheckNameAvailability.json
 */
async function signalRCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.checkNameAvailability("eastus", {
    name: "mySignalRService",
    type: "Microsoft.SignalRService/SignalR",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await signalRCheckNameAvailability();
}

main().catch(console.error);
