// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to handles requests to list all resources in a resource group.
 *
 * @summary handles requests to list all resources in a resource group.
 * x-ms-original-file: 2025-01-01-preview/SignalR_ListByResourceGroup.json
 */
async function signalRListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalR.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await signalRListByResourceGroup();
}

main().catch(console.error);
