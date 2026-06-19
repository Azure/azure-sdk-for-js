// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all available skus of the resource.
 *
 * @summary list all available skus of the resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_ListSkus.json
 */
async function signalRListSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.listSkus("myResourceGroup", "mySignalRService");
  console.log(result);
}

async function main() {
  await signalRListSkus();
}

main().catch(console.error);
