// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified shared private link resource
 *
 * @summary delete the specified shared private link resource
 * x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Delete.json
 */
async function signalRSharedPrivateLinkResourcesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRSharedPrivateLinkResources.delete(
    "upstream",
    "myResourceGroup",
    "mySignalRService",
  );
}

async function main() {
  await signalRSharedPrivateLinkResourcesDelete();
}

main().catch(console.error);
