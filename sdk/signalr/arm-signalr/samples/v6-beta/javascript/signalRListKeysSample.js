// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the access keys of the resource.
 *
 * @summary get the access keys of the resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_ListKeys.json
 */
async function signalRListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.listKeys("myResourceGroup", "mySignalRService");
  console.log(result);
}

async function main() {
  await signalRListKeys();
}

main().catch(console.error);
