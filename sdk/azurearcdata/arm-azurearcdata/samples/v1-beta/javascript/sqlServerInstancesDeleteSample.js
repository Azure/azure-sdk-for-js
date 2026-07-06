// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SQL Server Instance resource
 *
 * @summary deletes a SQL Server Instance resource
 * x-ms-original-file: 2026-03-01-preview/DeleteSqlServerInstance.json
 */
async function deleteASQLServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerInstances.delete("testrg", "testsqlServerInstance");
}

async function main() {
  await deleteASQLServerInstance();
}

main().catch(console.error);
