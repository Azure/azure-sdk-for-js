// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the private link resources that need to be created for a resource.
 *
 * @summary get the private link resources that need to be created for a resource.
 * x-ms-original-file: 2025-01-01-preview/SignalRPrivateLinkResources_List.json
 */
async function signalRPrivateLinkResourcesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRPrivateLinkResources.list(
    "myResourceGroup",
    "mySignalRService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await signalRPrivateLinkResourcesList();
}

main().catch(console.error);
