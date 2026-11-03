// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/BillingAccountAlerts.json
 */
async function billingAccountAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list("providers/Microsoft.Billing/billingAccounts/12345-6789");
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/BillingProfileAlerts.json
 */
async function billingProfileAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(
    "providers/Microsoft.Billing/billingAccounts/12345-6789/billingProfiles/13579",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/DepartmentAlerts.json
 */
async function departmentAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/departments/123",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountAlerts.json
 */
async function enrollmentAccountAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/enrollmentAccounts/456",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/InvoiceSectionAlerts.json
 */
async function invoiceSectionAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/ResourceGroupAlerts.json
 */
async function resourceGroupAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/SubscriptionAlerts.json
 */
async function subscriptionAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list("subscriptions/00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main(): Promise<void> {
  await billingAccountAlerts();
  await billingProfileAlerts();
  await departmentAlerts();
  await enrollmentAccountAlerts();
  await invoiceSectionAlerts();
  await resourceGroupAlerts();
  await subscriptionAlerts();
}

main().catch(console.error);
