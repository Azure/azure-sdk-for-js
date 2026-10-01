// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/EA/BillingAccountBudgetsList-EA-CategoryTypeFilter.json
 */
async function billingAccountBudgetsListEACategoryTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
    { filter: "properties/category eq 'ReservationUtilization'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/EA/BillingAccountBudgetsList-EA.json
 */
async function billingAccountBudgetsListEA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/EA/DepartmentBudgetsList.json
 */
async function departmentBudgetsListEA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/123456/departments/789101",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/EA/EnrollmentAccountBudgetsList.json
 */
async function enrollmentAccountBudgetsListEA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/123456/enrollmentAccounts/473845",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/BillingAccountBudgetsList-MCA-CategoryTypeFilter.json
 */
async function billingAccountBudgetsListMCACategoryTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01",
    { filter: "properties/category eq 'ReservationUtilization'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/BillingAccountBudgetsList-MCA.json
 */
async function billingAccountBudgetsListMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/BillingProfileBudgetsList-CategoryTypeFilter.json
 */
async function billingProfileBudgetsListMCACategoryTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/MYDEVTESTBP",
    { filter: "properties/category eq 'ReservationUtilization'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/BillingProfileBudgetsList.json
 */
async function billingProfileBudgetsListMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/MYDEVTESTBP",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/CustomerBudgetsList-CategoryTypeFilter.json
 */
async function customerBudgetsListMCACSPCategoryTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/customers/000000-1111-2222-3333-444444444444",
    { filter: "properties/category eq 'ReservationUtilization'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/CustomerBudgetsList.json
 */
async function customerBudgetsListMCACSP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/customers/000000-1111-2222-3333-444444444444",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/MCA/InvoiceSectionBudgetsList.json
 */
async function invoiceSectionBudgetsListMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/MYDEVTESTBP/invoiceSections/AAAA-BBBB-CCC-DDD",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/RBAC/ManagementGroupBudgetsList.json
 */
async function managementGroupBudgetsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "Microsoft.Management/managementGroups/MYDEVTESTMG",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/RBAC/ResourceGroupBudgetsList.json
 */
async function resourceGroupBudgetsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all budgets for the defined scope.
 *
 * @summary lists all budgets for the defined scope.
 * x-ms-original-file: 2025-03-01/Budgets/List/RBAC/SubscriptionBudgetsList.json
 */
async function subscriptionBudgetsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.budgets.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await billingAccountBudgetsListEACategoryTypeFilter();
  await billingAccountBudgetsListEA();
  await departmentBudgetsListEA();
  await enrollmentAccountBudgetsListEA();
  await billingAccountBudgetsListMCACategoryTypeFilter();
  await billingAccountBudgetsListMCA();
  await billingProfileBudgetsListMCACategoryTypeFilter();
  await billingProfileBudgetsListMCA();
  await customerBudgetsListMCACSPCategoryTypeFilter();
  await customerBudgetsListMCACSP();
  await invoiceSectionBudgetsListMCA();
  await managementGroupBudgetsList();
  await resourceGroupBudgetsList();
  await subscriptionBudgetsList();
}

main().catch(console.error);
