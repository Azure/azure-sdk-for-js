// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves SQL Server instance telemetry
 *
 * @summary retrieves SQL Server instance telemetry
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceTelemetry.json
 */
async function retrievesArcSQLServerCpuUtilizationTelemetry() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getTelemetry("testrg", "testsqlserver", {
    datasetName: "sqlserver_storage_io",
    startTime: new Date("2023-09-30T00:00:00Z"),
  });
  console.log(result);
}

async function main() {
  await retrievesArcSQLServerCpuUtilizationTelemetry();
}

main().catch(console.error);
