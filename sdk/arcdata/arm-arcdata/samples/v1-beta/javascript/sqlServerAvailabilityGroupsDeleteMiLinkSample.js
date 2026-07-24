// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the MI Link between an Azure Arc-enabled SQL Server and an Azure SQL Managed Instance.
 *
 * @summary deletes the MI Link between an Azure Arc-enabled SQL Server and an Azure SQL Managed Instance.
 * x-ms-original-file: 2026-03-01-preview/DeleteMiLink.json
 */
async function failOverFromAnArcSqlServerAvailabilityGroupToAManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerAvailabilityGroups.deleteMiLink("testrg", "testSqlServer_INST1", "testDAG");
}

async function main() {
  await failOverFromAnArcSqlServerAvailabilityGroupToAManagedInstance();
}

main().catch(console.error);
