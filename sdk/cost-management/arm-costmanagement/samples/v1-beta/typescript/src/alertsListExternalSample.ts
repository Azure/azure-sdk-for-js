// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Alerts for external cloud provider type defined.
 *
 * @summary lists the Alerts for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalBillingAccountAlerts.json
 */
async function externalBillingAccountAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.listExternal("externalBillingAccounts", "100");
  console.log(result);
}

/**
 * This sample demonstrates how to lists the Alerts for external cloud provider type defined.
 *
 * @summary lists the Alerts for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalSubscriptionAlerts.json
 */
async function externalSubscriptionAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.listExternal("externalSubscriptions", "100");
  console.log(result);
}

async function main(): Promise<void> {
  await externalBillingAccountAlerts();
  await externalSubscriptionAlerts();
}

main().catch(console.error);
