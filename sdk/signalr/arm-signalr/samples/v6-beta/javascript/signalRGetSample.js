// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the resource and its properties.
 *
 * @summary get the resource and its properties.
 * x-ms-original-file: 2025-01-01-preview/SignalR_Get.json
 */
async function signalRGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.get("myResourceGroup", "mySignalRService");
  console.log(result);
}

async function main() {
  await signalRGet();
}

main().catch(console.error);
