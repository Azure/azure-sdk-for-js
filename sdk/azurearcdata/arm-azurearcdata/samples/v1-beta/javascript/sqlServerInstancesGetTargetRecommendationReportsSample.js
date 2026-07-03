// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 *
 * @summary retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceTargetRecommendationReports.json
 */
async function retrievesArcSQLServerInstanceTargetRecommendationReports() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getTargetRecommendationReports(
    "testrg",
    "testsqlserver",
    { sqlServerInstanceTargetRecommendationReportsRequest: { reportOffset: 0, sectionOffset: 0 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 *
 * @summary retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceTargetRecommendationReportsLastPage.json
 */
async function retrievesArcSQLServerInstanceTargetRecommendationReportsLastPage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getTargetRecommendationReports(
    "testrg",
    "testsqlserver",
    { sqlServerInstanceTargetRecommendationReportsRequest: { reportOffset: 0, sectionOffset: 9 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 *
 * @summary retrieves the current job status and the latest target recommendation report for the SQL Server instance. The response always includes the jobStatus field, which indicates the state of the most recent target recommendation job (NotStarted, InProgress, Succeeded, or Failed). The report data is included in the response only when the jobStatus is Succeeded. A target recommendation job must be started using the RunTargetRecommendationJob API before calling this API. Only the most recent report is returned. If the report contains more sections than can be returned in a single response, use the nextReportOffset and nextSectionOffset values from the response to retrieve the remaining data.
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceTargetRecommendationReportsWithFilters.json
 */
async function retrievesArcSQLServerInstanceTargetRecommendationReportsWithFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getTargetRecommendationReports(
    "testrg",
    "testsqlserver",
    {
      sqlServerInstanceTargetRecommendationReportsRequest: {
        databaseNames: ["database1", "database2"],
        reportOffset: 0,
        sectionOffset: 0,
        sectionType: "SqlDbTargetRecommendationPerDatabase",
      },
    },
  );
  console.log(result);
}

async function main() {
  await retrievesArcSQLServerInstanceTargetRecommendationReports();
  await retrievesArcSQLServerInstanceTargetRecommendationReportsLastPage();
  await retrievesArcSQLServerInstanceTargetRecommendationReportsWithFilters();
}

main().catch(console.error);
