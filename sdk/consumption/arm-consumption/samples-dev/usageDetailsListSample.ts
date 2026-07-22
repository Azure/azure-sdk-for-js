// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsExpand.json
 */
async function usageDetailsExpandLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { expand: "meterDetails,additionalInfo", filter: "tags eq 'dev:tools'", top: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsList.json
 */
async function usageDetailsListLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByBillingAccount.json
 */
async function billingAccountUsageDetailsListLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByDepartment.json
 */
async function departmentUsageDetailsListLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/Departments/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByEnrollmentAccount.json
 */
async function enrollmentAccountUsageDetailsListLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/EnrollmentAccounts/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMCABillingAccount.json
 */
async function billingAccountUsageDetailsListModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMCABillingProfile.json
 */
async function billingProfileUsageDetailsListModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/billingProfiles/2468",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMCACustomer.json
 */
async function customerUsageDetailsListModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/customers/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMCAInvoiceSection.json
 */
async function invoiceSectionUsageDetailsListModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/invoiceSections/98765",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByManagementGroup.json
 */
async function managementGroupUsageDetailsListLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMetricActualCost.json
 */
async function usageDetailsListByMetricActualCostLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { metric: "actualcost" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMetricAmortizedCost.json
 */
async function usageDetailsListByMetricAmortizedCostLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { metric: "amortizedcost" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListByMetricUsage.json
 */
async function usageDetailsListByMetricUsageLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { metric: "usage" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListFilterByTag.json
 */
async function usageDetailsListFilterByTagLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { filter: "tags eq 'dev:tools'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListForBillingPeriod.json
 */
async function usageDetailsListForBillingPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListForBillingPeriodByBillingAccount.json
 */
async function billingAccountUsageDetailsListForBillingPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/BillingAccounts/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListForBillingPeriodByDepartment.json
 */
async function departmentUsageDetailsListForBillingPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/Departments/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListForBillingPeriodByEnrollmentAccount.json
 */
async function enrollmentAccountUsageDetailsListForBillingPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "providers/Microsoft.Billing/EnrollmentAccounts/1234",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2024-08-01/UsageDetailsListForBillingPeriodByManagementGroup.json
 */
async function managementGroupUsageDetailsListForBillingPeriodLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.usageDetails.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await usageDetailsExpandLegacy();
  await usageDetailsListLegacy();
  await billingAccountUsageDetailsListLegacy();
  await departmentUsageDetailsListLegacy();
  await enrollmentAccountUsageDetailsListLegacy();
  await billingAccountUsageDetailsListModern();
  await billingProfileUsageDetailsListModern();
  await customerUsageDetailsListModern();
  await invoiceSectionUsageDetailsListModern();
  await managementGroupUsageDetailsListLegacy();
  await usageDetailsListByMetricActualCostLegacy();
  await usageDetailsListByMetricAmortizedCostLegacy();
  await usageDetailsListByMetricUsageLegacy();
  await usageDetailsListFilterByTagLegacy();
  await usageDetailsListForBillingPeriodLegacy();
  await billingAccountUsageDetailsListForBillingPeriodLegacy();
  await departmentUsageDetailsListForBillingPeriodLegacy();
  await enrollmentAccountUsageDetailsListForBillingPeriodLegacy();
  await managementGroupUsageDetailsListForBillingPeriodLegacy();
}

main().catch(console.error);
