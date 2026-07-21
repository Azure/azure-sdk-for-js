// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list shared private link resources
 *
 * @summary list shared private link resources
 * x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_List.json
 */
async function signalRSharedPrivateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRSharedPrivateLinkResources.list(
    "myResourceGroup",
    "mySignalRService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await signalRSharedPrivateLinkResourcesList();
}

main().catch(console.error);
