// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SQL Managed Instance resource
 *
 * @summary deletes a SQL Managed Instance resource
 * x-ms-original-file: 2026-03-01-preview/DeleteSqlManagedInstance.json
 */
async function deleteASQLInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlManagedInstances.delete("testrg", "testsqlManagedInstance");
}

async function main() {
  await deleteASQLInstance();
}

main().catch(console.error);
