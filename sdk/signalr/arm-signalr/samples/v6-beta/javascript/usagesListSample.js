// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list resource usage quotas by location.
 *
 * @summary list resource usage quotas by location.
 * x-ms-original-file: 2025-01-01-preview/Usages_List.json
 */
async function usagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usagesList();
}

main().catch(console.error);
