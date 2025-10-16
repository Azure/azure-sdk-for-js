// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get current subscription usages
 *
 * @summary get current subscription usages
 * x-ms-original-file: 2025-07-01-preview/Usages_List.json
 */
async function usagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.netAppResourceUsages.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usagesList();
}

main().catch(console.error);
