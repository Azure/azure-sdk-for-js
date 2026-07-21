// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the alerts for scope defined.
 *
 * @summary lists the alerts for scope defined.
 * x-ms-original-file: 2025-03-01/BillingAccountAlerts.json
 */
async function billingAccountAlerts() {
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
async function billingProfileAlerts() {
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
async function departmentAlerts() {
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
async function enrollmentAccountAlerts() {
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
async function invoiceSectionAlerts() {
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
async function resourceGroupAlerts() {
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
async function subscriptionAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.list("subscriptions/00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await billingAccountAlerts();
  await billingProfileAlerts();
  await departmentAlerts();
  await enrollmentAccountAlerts();
  await invoiceSectionAlerts();
  await resourceGroupAlerts();
  await subscriptionAlerts();
}

main().catch(console.error);
