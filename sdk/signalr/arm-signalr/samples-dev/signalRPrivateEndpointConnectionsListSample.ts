// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private endpoint connections
 *
 * @summary list private endpoint connections
 * x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_List.json
 */
async function signalRPrivateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRPrivateEndpointConnections.list(
    "myResourceGroup",
    "mySignalRService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await signalRPrivateEndpointConnectionsList();
}

main().catch(console.error);
