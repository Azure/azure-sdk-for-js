// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified shared private link resource
 *
 * @summary get the specified shared private link resource
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_Get.json
 */
async function signalRReplicaSharedPrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicaSharedPrivateLinkResources.get(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
    "upstream",
  );
  console.log(result);
}

async function main() {
  await signalRReplicaSharedPrivateLinkResourcesGet();
}

main().catch(console.error);
