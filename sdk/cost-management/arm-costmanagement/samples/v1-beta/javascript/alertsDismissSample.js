// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to dismisses the specified alert
 *
 * @summary dismisses the specified alert
 * x-ms-original-file: 2025-03-01/DismissResourceGroupAlerts.json
 */
async function patchResourceGroupAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.dismiss(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
    "22222222-2222-2222-2222-222222222222",
    { status: "Dismissed" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to dismisses the specified alert
 *
 * @summary dismisses the specified alert
 * x-ms-original-file: 2025-03-01/DismissSubscriptionAlerts.json
 */
async function patchSubscriptionAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.dismiss(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "22222222-2222-2222-2222-222222222222",
    { status: "Dismissed" },
  );
  console.log(result);
}

async function main() {
  await patchResourceGroupAlerts();
  await patchSubscriptionAlerts();
}

main().catch(console.error);
