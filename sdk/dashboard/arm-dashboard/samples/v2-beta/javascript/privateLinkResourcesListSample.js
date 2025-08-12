// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all private link resources information for this grafana resource
 *
 * @summary list all private link resources information for this grafana resource
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_List.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("myResourceGroup", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
