// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportByBillingAccountLegacyAndBillingPeriod.json
 */

import type { GenerateDetailedCostReportDefinition } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function generateDetailedCostReportByBillingAccountLegacyAndBillingPeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345";
  const parameters: GenerateDetailedCostReportDefinition = {
    billingPeriod: "202008",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportByBillingProfileAndInvoiceId.json
 */
async function generateDetailedCostReportByBillingProfileAndInvoiceId(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579";
  const parameters: GenerateDetailedCostReportDefinition = {
    invoiceId: "M1234567",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId.json
 */
async function generateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579";
  const parameters: GenerateDetailedCostReportDefinition = {
    customerId: "456789",
    invoiceId: "M1234567",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportByCustomerAndTimePeriod.json
 */
async function generateDetailedCostReportByCustomerAndTimePeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579";
  const parameters: GenerateDetailedCostReportDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @summary Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateDetailedCostReportBySubscriptionAndTimePeriod.json
 */
async function generateDetailedCostReportBySubscriptionAndTimePeriod(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const parameters: GenerateDetailedCostReportDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateDetailedCostReportByBillingAccountLegacyAndBillingPeriod();
  await generateDetailedCostReportByBillingProfileAndInvoiceId();
  await generateDetailedCostReportByBillingProfileAndInvoiceIdAndCustomerId();
  await generateDetailedCostReportByCustomerAndTimePeriod();
  await generateDetailedCostReportBySubscriptionAndTimePeriod();
}

main().catch(console.error);
