// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get specific private link resource information for this grafana resource
 *
 * @summary get specific private link resource information for this grafana resource
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_Get.json
 */
async function privateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("myResourceGroup", "myWorkspace", "grafana");
  console.log(result);
}

async function main() {
  await privateLinkResourcesGet();
}

main().catch(console.error);
