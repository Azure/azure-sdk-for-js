// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list shared private link resources
 *
 * @summary list shared private link resources
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_List.json
 */
async function signalRReplicaSharedPrivateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRReplicaSharedPrivateLinkResources.list(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await signalRReplicaSharedPrivateLinkResourcesList();
}

main().catch(console.error);
