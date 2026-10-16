// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CarbonOptimizationManagementClient } from "@azure/arm-carbonoptimization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports scoped to a billing account.
 *
 * @summary aPI for Carbon Emissions Reports scoped to a billing account.
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsByBillingAccountMonthlySummaryReport.json
 */
async function queryCarbonEmissionByBillingAccountMonthlySummaryReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReportsByBillingAccount(
    "providers/Microsoft.Billing/billingAccounts/12345678",
    {
      reportType: "MonthlySummaryReport",
      carbonScopeList: ["Scope1", "Scope2", "Scope3"],
      dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports scoped to a billing account.
 *
 * @summary aPI for Carbon Emissions Reports scoped to a billing account.
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsByBillingAccountOverallSummaryReport.json
 */
async function queryCarbonEmissionByBillingAccountOverallSummaryReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReportsByBillingAccount(
    "providers/Microsoft.Billing/billingAccounts/12345678",
    {
      reportType: "OverallSummaryReport",
      carbonScopeList: ["Scope1", "Scope2", "Scope3"],
      dateRange: { start: new Date("2024-01-01"), end: new Date("2024-06-01") },
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports scoped to a billing account.
 *
 * @summary aPI for Carbon Emissions Reports scoped to a billing account.
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsByBillingAccountSubscriptionItemDetailsReport.json
 */
async function queryCarbonEmissionByBillingAccountSubscriptionItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReportsByBillingAccount(
    "providers/Microsoft.Billing/billingAccounts/12345678",
    {
      reportType: "ItemDetailsReport",
      carbonScopeList: ["Scope1", "Scope3"],
      dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
      categoryType: "Subscription",
      orderBy: "LatestMonthEmissions",
      sortDirection: "Desc",
      pageSize: 100,
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports scoped to a billing account.
 *
 * @summary aPI for Carbon Emissions Reports scoped to a billing account.
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsByBillingAccountTopNSubscriptionItemsMonthlyReport.json
 */
async function queryCarbonEmissionByBillingAccountTopNSubscriptionsMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReportsByBillingAccount(
    "providers/Microsoft.Billing/billingAccounts/12345678",
    {
      reportType: "TopItemsMonthlySummaryReport",
      carbonScopeList: ["Scope1", "Scope3"],
      dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
      categoryType: "Subscription",
      topItems: 2,
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports scoped to a billing account.
 *
 * @summary aPI for Carbon Emissions Reports scoped to a billing account.
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsByBillingAccountTopNSubscriptionItemsReport.json
 */
async function queryCarbonEmissionByBillingAccountTopNSubscriptionsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReportsByBillingAccount(
    "providers/Microsoft.Billing/billingAccounts/12345678",
    {
      reportType: "TopItemsSummaryReport",
      carbonScopeList: ["Scope1", "Scope3"],
      dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
      categoryType: "Subscription",
      topItems: 2,
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryCarbonEmissionByBillingAccountMonthlySummaryReport();
  await queryCarbonEmissionByBillingAccountOverallSummaryReport();
  await queryCarbonEmissionByBillingAccountSubscriptionItemDetailsReport();
  await queryCarbonEmissionByBillingAccountTopNSubscriptionsMonthlyReport();
  await queryCarbonEmissionByBillingAccountTopNSubscriptionsReport();
}

main().catch(console.error);
