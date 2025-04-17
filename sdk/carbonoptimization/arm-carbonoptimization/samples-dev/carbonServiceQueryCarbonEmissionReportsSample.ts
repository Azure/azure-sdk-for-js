// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CarbonClient } from "@azure/arm-carbonoptimization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsLocationItemDetailsReport.json
 */
async function queryCarbonEmissionLocationItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Location",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsMonthlySummaryReport.json
 */
async function queryCarbonEmissionOverallMonthlySummaryReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "MonthlySummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsMonthlySummaryReportWithOtherOptionalFilter.json
 */
async function queryCarbonEmissionMonthlySummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "MonthlySummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    locationList: ["east us", "west us"],
    resourceTypeList: ["microsoft.storage/storageaccounts", "microsoft.databricks/workspaces"],
    resourceGroupUrlList: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg-name",
    ],
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsOverallSummaryReport.json
 */
async function queryCarbonEmissionOverallSummaryReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "OverallSummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2023-06-01", end: "2023-06-01" },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsOverallSummaryReportWithOtherOptionalFilter.json
 */
async function queryCarbonEmissionOverallSummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "OverallSummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2023-06-01", end: "2023-06-01" },
    locationList: ["east us", "west us"],
    resourceTypeList: ["microsoft.storage/storageaccounts", "microsoft.databricks/workspaces"],
    resourceGroupUrlList: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg-name",
    ],
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsResourceGroupItemDetailsReport.json
 */
async function queryCarbonEmissionResourceGroupItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "ResourceGroup",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsResourceItemDetailsReport.json
 */
async function queryCarbonEmissionResourceItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Resource",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsResourceItemDetailsReportWithPaginationToken.json
 */
async function queryCarbonEmissionResourceItemDetailsReportWithPaginationToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Resource",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
    skipToken: "dGVzZGZhZGZzZnNkZg==",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsResourceTypeItemDetailsReport.json
 */
async function queryCarbonEmissionResourceTypeItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "ResourceType",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsSubscriptionItemDetailsReportReport.json
 */
async function queryCarbonEmissionSubscriptionsItemDetailsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "ItemDetailsReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Subscription",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNLocationItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNLocationsMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsMonthlySummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    categoryType: "Location",
    topItems: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNLocationItemsReport.json
 */
async function queryCarbonEmissionTopNLocationsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsSummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Location",
    topItems: 5,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceGroupItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceGroupMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsMonthlySummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    categoryType: "ResourceGroup",
    topItems: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceGroupItemsReport.json
 */
async function queryCarbonEmissionTopNResourceGroupReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsSummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "ResourceGroup",
    topItems: 5,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsMonthlySummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    categoryType: "Resource",
    topItems: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceItemsReport.json
 */
async function queryCarbonEmissionTopNResourceReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsSummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Resource",
    topItems: 5,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceTypeItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceTypeMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsMonthlySummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    categoryType: "ResourceType",
    topItems: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNResourceTypeItemsReport.json
 */
async function queryCarbonEmissionTopNResourceTypeReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsSummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "ResourceType",
    topItems: 5,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNSubscriptionItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNSubscriptionsMonthlyReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsMonthlySummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-03-01", end: "2024-05-01" },
    categoryType: "Subscription",
    topItems: 2,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2025-04-01/queryCarbonEmissionsTopNSubscriptionItemsReport.json
 */
async function queryCarbonEmissionTopNSubscriptionsReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.carbonService.queryCarbonEmissionReports({
    reportType: "TopItemsSummaryReport",
    subscriptionList: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001,",
      "00000000-0000-0000-0000-000000000002",
      "00000000-0000-0000-0000-000000000003",
      "00000000-0000-0000-0000-000000000004",
      "00000000-0000-0000-0000-000000000005",
      "00000000-0000-0000-0000-000000000006",
      "00000000-0000-0000-0000-000000000007",
      "00000000-0000-0000-0000-000000000008",
    ],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: "2024-05-01", end: "2024-05-01" },
    categoryType: "Subscription",
    topItems: 5,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryCarbonEmissionLocationItemDetailsReport();
  await queryCarbonEmissionOverallMonthlySummaryReport();
  await queryCarbonEmissionMonthlySummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList();
  await queryCarbonEmissionOverallSummaryReport();
  await queryCarbonEmissionOverallSummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList();
  await queryCarbonEmissionResourceGroupItemDetailsReport();
  await queryCarbonEmissionResourceItemDetailsReport();
  await queryCarbonEmissionResourceItemDetailsReportWithPaginationToken();
  await queryCarbonEmissionResourceTypeItemDetailsReport();
  await queryCarbonEmissionSubscriptionsItemDetailsReport();
  await queryCarbonEmissionTopNLocationsMonthlyReport();
  await queryCarbonEmissionTopNLocationsReport();
  await queryCarbonEmissionTopNResourceGroupMonthlyReport();
  await queryCarbonEmissionTopNResourceGroupReport();
  await queryCarbonEmissionTopNResourceMonthlyReport();
  await queryCarbonEmissionTopNResourceReport();
  await queryCarbonEmissionTopNResourceTypeMonthlyReport();
  await queryCarbonEmissionTopNResourceTypeReport();
  await queryCarbonEmissionTopNSubscriptionsMonthlyReport();
  await queryCarbonEmissionTopNSubscriptionsReport();
}

main().catch(console.error);
