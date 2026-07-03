// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the migration readiness report for the SQL Server instance. The report contains an assessment of the instance's readiness for migration to Azure SQL targets.
 *
 * @summary retrieves the migration readiness report for the SQL Server instance. The report contains an assessment of the instance's readiness for migration to Azure SQL targets.
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceMigrationReadinessReport.json
 */
async function retrievesArcSQLServerInstanceMigrationReadinessReport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getMigrationReadinessReport(
    "testrg",
    "testsqlserver",
  );
  console.log(result);
}

async function main() {
  await retrievesArcSQLServerInstanceMigrationReadinessReport();
}

main().catch(console.error);
