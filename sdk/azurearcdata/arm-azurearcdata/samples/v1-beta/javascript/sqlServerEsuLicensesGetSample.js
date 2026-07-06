// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a SQL Server ESU license resource
 *
 * @summary retrieves a SQL Server ESU license resource
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerEsuLicense.json
 */
async function getsASQLServerESULicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerEsuLicenses.get("testrg", "testsqlServerEsuLicense");
  console.log(result);
}

async function main() {
  await getsASQLServerESULicense();
}

main().catch(console.error);
