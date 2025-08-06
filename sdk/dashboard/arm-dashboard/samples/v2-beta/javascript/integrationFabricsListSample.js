// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list IntegrationFabric resources by ManagedGrafana
 *
 * @summary list IntegrationFabric resources by ManagedGrafana
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_List.json
 */
async function integrationFabricsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.integrationFabrics.list("myResourceGroup", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await integrationFabricsList();
}

main().catch(console.error);
