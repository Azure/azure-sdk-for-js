// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByBillingAccountList.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingAccountMarketplacesList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByBillingAccountListForBillingPeriod.json
 */
async function billingAccountMarketplacesListForBillingPeriod(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByDepartmentList.json
 */
async function departmentMarketplacesList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/departments/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByDepartment_ListByBillingPeriod.json
 */
async function departmentMarketplacesListForBillingPeriod(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/departments/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByEnrollmentAccountList.json
 */
async function enrollmentAccountMarketplacesList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/enrollmentAccounts/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByEnrollmentAccounts_ListByBillingPeriod.json
 */
async function enrollmentAccountMarketplacesListForBillingPeriod(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/enrollmentAccounts/123456";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByManagementGroupList.json
 */
async function managementGroupMarketplacesList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesByManagementGroup_ListForBillingPeriod.json
 */
async function managementGroupMarketplacesListForBillingPeriod(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesList.json
 */
async function subscriptionMarketplacesList(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 *
 * @summary Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/MarketplacesListForBillingPeriod.json
 */
async function subscriptionMarketplacesListForBillingPeriod(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaces.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
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
