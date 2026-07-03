// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a SQL Server license resource
 *
 * @summary retrieves a SQL Server license resource
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerLicense.json
 */
async function getsASQLServerLicenseTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerLicenses.get("testrg", "testsqlServerLicense");
  console.log(result);
}

async function main() {
  await getsASQLServerLicenseTags();
}

main().catch(console.error);
