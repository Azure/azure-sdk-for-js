// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-08-01/Grafana_FetchAvailablePlugins.json
 */
async function grafanaFetchAvailablePlugins() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.fetchAvailablePlugins("myResourceGroup", "myWorkspace");
  console.log(result);
}

async function main() {
  await grafanaFetchAvailablePlugins();
}

main().catch(console.error);
