// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a specific workspace for Grafana resource.
 *
 * @summary get the properties of a specific workspace for Grafana resource.
 * x-ms-original-file: 2024-11-01-preview/Grafana_Get.json
 */
async function grafanaGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.get("myResourceGroup", "myWorkspace");
  console.log(result);
}

async function main() {
  await grafanaGet();
}

main().catch(console.error);
