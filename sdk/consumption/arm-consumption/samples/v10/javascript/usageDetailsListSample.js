// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 *
 * @summary lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
 *
 * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
 * x-ms-original-file: 2026-06-01/UsageDetailsExpand.json
 */
async function usageDetailsExpandLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsList.json
 */
async function usageDetailsListLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByBillingAccount.json
 */
async function billingAccountUsageDetailsListLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByDepartment.json
 */
async function departmentUsageDetailsListLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByEnrollmentAccount.json
 */
async function enrollmentAccountUsageDetailsListLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMCABillingAccount.json
 */
async function billingAccountUsageDetailsListModern() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMCABillingProfile.json
 */
async function billingProfileUsageDetailsListModern() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMCACustomer.json
 */
async function customerUsageDetailsListModern() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMCAInvoiceSection.json
 */
async function invoiceSectionUsageDetailsListModern() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByManagementGroup.json
 */
async function managementGroupUsageDetailsListLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMetricActualCost.json
 */
async function usageDetailsListByMetricActualCostLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMetricAmortizedCost.json
 */
async function usageDetailsListByMetricAmortizedCostLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListByMetricUsage.json
 */
async function usageDetailsListByMetricUsageLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListFilterByTag.json
 */
async function usageDetailsListFilterByTagLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListForBillingPeriod.json
 */
async function usageDetailsListForBillingPeriodLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListForBillingPeriodByBillingAccount.json
 */
async function billingAccountUsageDetailsListForBillingPeriodLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListForBillingPeriodByDepartment.json
 */
async function departmentUsageDetailsListForBillingPeriodLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListForBillingPeriodByEnrollmentAccount.json
 */
async function enrollmentAccountUsageDetailsListForBillingPeriodLegacy() {
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
 * x-ms-original-file: 2026-06-01/UsageDetailsListForBillingPeriodByManagementGroup.json
 */
async function managementGroupUsageDetailsListForBillingPeriodLegacy() {
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

async function main() {
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
