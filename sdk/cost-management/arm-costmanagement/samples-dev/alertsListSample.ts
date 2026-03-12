// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/BillingAccountAlerts.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingAccountAlerts(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/BillingProfileAlerts.json
 */
async function billingProfileAlerts(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/DepartmentAlerts.json
 */
async function departmentAlerts(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/departments/123";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/EnrollmentAccountAlerts.json
 */
async function enrollmentAccountAlerts(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/enrollmentAccounts/456";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/InvoiceSectionAlerts.json
 */
async function invoiceSectionAlerts(): Promise<void> {
  const scope =
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ResourceGroupAlerts.json
 */
async function resourceGroupAlerts(): Promise<void> {
  const scope =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the alerts for scope defined.
 *
 * @summary Lists the alerts for scope defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/SubscriptionAlerts.json
 */
async function subscriptionAlerts(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list(scope);
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
