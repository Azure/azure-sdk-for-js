// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SQL Server license resource
 *
 * @summary deletes a SQL Server license resource
 * x-ms-original-file: 2026-03-01-preview/DeleteSqlServerLicense.json
 */
async function deleteASQLServerLicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerLicenses.delete("testrg", "testsqlServerLicense");
}

async function main() {
  await deleteASQLServerLicense();
}

main().catch(console.error);
