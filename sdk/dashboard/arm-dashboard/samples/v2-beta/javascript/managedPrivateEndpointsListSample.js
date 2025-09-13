// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all managed private endpoints of a grafana resource.
 *
 * @summary list all managed private endpoints of a grafana resource.
 * x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_List.json
 */
async function managedPrivateEndpointList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedPrivateEndpoints.list("myResourceGroup", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await managedPrivateEndpointList();
}

main().catch(console.error);
