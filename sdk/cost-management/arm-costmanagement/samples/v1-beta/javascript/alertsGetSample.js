// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the alert for the scope by alert ID.
 *
 * @summary gets the alert for the scope by alert ID.
 * x-ms-original-file: 2025-03-01/SingleResourceGroupAlert.json
 */
async function singleResourceGroupAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
    "22222222-2222-2222-2222-222222222222",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the alert for the scope by alert ID.
 *
 * @summary gets the alert for the scope by alert ID.
 * x-ms-original-file: 2025-03-01/SingleSubscriptionAlert.json
 */
async function singleSubscriptionAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.get(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "22222222-2222-2222-2222-222222222222",
  );
  console.log(result);
}

async function main() {
  await singleResourceGroupAlerts();
  await singleSubscriptionAlerts();
}

main().catch(console.error);
