// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a shared private link resource
 *
 * @summary create or update a shared private link resource
 * x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_CreateOrUpdate.json
 */
async function signalRReplicaSharedPrivateLinkResourcesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicaSharedPrivateLinkResources.createOrUpdate(
    "myResourceGroup",
    "mySignalRService",
    "mySignalRService-eastus",
    "upstream",
    {
      groupId: "sites",
      privateLinkResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp",
      requestMessage: "Please approve",
    },
  );
  console.log(result);
}

async function main() {
  await signalRReplicaSharedPrivateLinkResourcesCreateOrUpdate();
}

main().catch(console.error);
