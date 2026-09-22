// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Kusto cluster database principalAssignment.
 *
 * @summary gets a Kusto cluster database principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsGet.json
 */
async function kustoDatabasePrincipalAssignmentsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databasePrincipalAssignments.get(
    "kustorptest",
    "kustoCluster",
    "Kustodatabase8",
    "kustoprincipal1",
  );
  console.log(result);
}

async function main() {
  await kustoDatabasePrincipalAssignmentsGet();
}

main().catch(console.error);
