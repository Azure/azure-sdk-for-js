// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CarbonOptimizationManagementClient } = require("@azure/arm-carbonoptimization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsLocationItemDetailsReport.json
 */
async function queryCarbonEmissionLocationItemDetailsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Location",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsMonthlySummaryReport.json
 */
async function queryCarbonEmissionOverallMonthlySummaryReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
    reportType: "MonthlySummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsMonthlySummaryReportWithOtherOptionalFilter.json
 */
async function queryCarbonEmissionMonthlySummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
    reportType: "MonthlySummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    locationList: ["east us", "west us"],
    resourceTypeList: ["microsoft.storage/storageaccounts", "microsoft.databricks/workspaces"],
    resourceGroupUrlList: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg-name",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsOverallSummaryReport.json
 */
async function queryCarbonEmissionOverallSummaryReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
    reportType: "OverallSummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: new Date("2023-06-01"), end: new Date("2023-06-01") },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsOverallSummaryReportWithOtherOptionalFilter.json
 */
async function queryCarbonEmissionOverallSummaryReportWithOptionalFilterLocationListResourceTypeListResourceGroupUrlList() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
    reportType: "OverallSummaryReport",
    subscriptionList: ["00000000-0000-0000-0000-000000000000"],
    carbonScopeList: ["Scope1", "Scope3"],
    dateRange: { start: new Date("2023-06-01"), end: new Date("2023-06-01") },
    locationList: ["east us", "west us"],
    resourceTypeList: ["microsoft.storage/storageaccounts", "microsoft.databricks/workspaces"],
    resourceGroupUrlList: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg-name",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsResourceGroupItemDetailsReport.json
 */
async function queryCarbonEmissionResourceGroupItemDetailsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceGroup",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsResourceItemDetailsReport.json
 */
async function queryCarbonEmissionResourceItemDetailsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Resource",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsResourceItemDetailsReportWithPaginationToken.json
 */
async function queryCarbonEmissionResourceItemDetailsReportWithPaginationToken() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Resource",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
    skipToken: "dGVzZGZhZGZzZnNkZg==",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsResourceTypeItemDetailsReport.json
 */
async function queryCarbonEmissionResourceTypeItemDetailsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceType",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsSubscriptionItemDetailsReportReport.json
 */
async function queryCarbonEmissionSubscriptionsItemDetailsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Subscription",
    orderBy: "LatestMonthEmissions",
    sortDirection: "Desc",
    pageSize: 100,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNLocationItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNLocationsMonthlyReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    categoryType: "Location",
    topItems: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNLocationItemsReport.json
 */
async function queryCarbonEmissionTopNLocationsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Location",
    topItems: 5,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceGroupItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceGroupMonthlyReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceGroup",
    topItems: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceGroupItemsReport.json
 */
async function queryCarbonEmissionTopNResourceGroupReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceGroup",
    topItems: 5,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceMonthlyReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    categoryType: "Resource",
    topItems: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceItemsReport.json
 */
async function queryCarbonEmissionTopNResourceReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Resource",
    topItems: 5,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceTypeItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNResourceTypeMonthlyReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceType",
    topItems: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNResourceTypeItemsReport.json
 */
async function queryCarbonEmissionTopNResourceTypeReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "ResourceType",
    topItems: 5,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNSubscriptionItemsMonthlyReport.json
 */
async function queryCarbonEmissionTopNSubscriptionsMonthlyReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-03-01"), end: new Date("2024-05-01") },
    categoryType: "Subscription",
    topItems: 2,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI for Carbon Emissions Reports
 *
 * @summary aPI for Carbon Emissions Reports
 * x-ms-original-file: 2026-05-01-preview/queryCarbonEmissionsTopNSubscriptionItemsReport.json
 */
async function queryCarbonEmissionTopNSubscriptionsReport() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionReports({
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
    dateRange: { start: new Date("2024-05-01"), end: new Date("2024-05-01") },
    categoryType: "Subscription",
    topItems: 5,
  });
  console.log(result);
}

async function main() {
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
