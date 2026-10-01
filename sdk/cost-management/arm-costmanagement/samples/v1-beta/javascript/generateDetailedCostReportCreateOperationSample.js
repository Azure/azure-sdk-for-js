// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportByBillingAccountLegacyAndBillingPeriod.json
 */
async function generateDetailedCostReportByBillingAccountLegacyAndBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345",
    { billingPeriod: "202008", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportByBillingProfileAndInvoiceId.json
 */
async function generateDetailedCostReportByBillingProfileAndInvoiceId() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    { invoiceId: "M1234567", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId.json
 */
async function generateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    { customerId: "456789", invoiceId: "M1234567", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportByCustomerAndTimePeriod.json
 */
async function generateDetailedCostReportByCustomerAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportBySubscriptionAndTimePeriod.json
 */
async function generateDetailedCostReportBySubscriptionAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.createOperation(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

async function main() {
  await generateDetailedCostReportByBillingAccountLegacyAndBillingPeriod();
  await generateDetailedCostReportByBillingProfileAndInvoiceId();
  await generateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId();
  await generateDetailedCostReportByCustomerAndTimePeriod();
  await generateDetailedCostReportBySubscriptionAndTimePeriod();
}

main().catch(console.error);
