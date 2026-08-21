// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByBillingAccountList.json
 */
async function billingAccountMarketplacesList() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByBillingAccountListForBillingPeriod.json
 */
async function billingAccountMarketplacesListForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByDepartmentList.json
 */
async function departmentMarketplacesList() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/departments/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByDepartment_ListByBillingPeriod.json
 */
async function departmentMarketplacesListForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/departments/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByEnrollmentAccountList.json
 */
async function enrollmentAccountMarketplacesList() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/enrollmentAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByEnrollmentAccounts_ListByBillingPeriod.json
 */
async function enrollmentAccountMarketplacesListForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "providers/Microsoft.Billing/enrollmentAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByManagementGroupList.json
 */
async function managementGroupMarketplacesList() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesByManagementGroup_ListForBillingPeriod.json
 */
async function managementGroupMarketplacesListForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesList.json
 */
async function subscriptionMarketplacesList() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/MarketplacesListForBillingPeriod.json
 */
async function subscriptionMarketplacesListForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingAccountMarketplacesList();
  await billingAccountMarketplacesListForBillingPeriod();
  await departmentMarketplacesList();
  await departmentMarketplacesListForBillingPeriod();
  await enrollmentAccountMarketplacesList();
  await enrollmentAccountMarketplacesListForBillingPeriod();
  await managementGroupMarketplacesList();
  await managementGroupMarketplacesListForBillingPeriod();
  await subscriptionMarketplacesList();
  await subscriptionMarketplacesListForBillingPeriod();
}

main().catch(console.error);
