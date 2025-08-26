// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific managed private endpoint of a grafana resource.
 *
 * @summary get a specific managed private endpoint of a grafana resource.
 * x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Get.json
 */
async function managedPrivateEndpointGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.get(
    "myResourceGroup",
    "myWorkspace",
    "myMPEName",
  );
  console.log(result);
}

async function main() {
  await managedPrivateEndpointGet();
}

main().catch(console.error);
