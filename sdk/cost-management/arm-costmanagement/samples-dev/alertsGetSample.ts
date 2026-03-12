// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the alert for the scope by alert ID.
 *
 * @summary Gets the alert for the scope by alert ID.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/SingleResourceGroupAlert.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function singleResourceGroupAlerts(): Promise<void> {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer";
  const alertId = "22222222-2222-2222-2222-222222222222";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.get(scope, alertId);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the alert for the scope by alert ID.
 *
 * @summary Gets the alert for the scope by alert ID.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/SingleSubscriptionAlert.json
 */
async function singleSubscriptionAlerts(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const alertId = "22222222-2222-2222-2222-222222222222";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.get(scope, alertId);
  console.log(result);
}

async function main(): Promise<void> {
  await singleResourceGroupAlerts();
  await singleSubscriptionAlerts();
}

main().catch(console.error);
