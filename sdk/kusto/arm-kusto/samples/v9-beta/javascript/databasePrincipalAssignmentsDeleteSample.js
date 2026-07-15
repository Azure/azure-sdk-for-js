// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Kusto principalAssignment.
 *
 * @summary deletes a Kusto principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsDelete.json
 */
async function kustoDatabasePrincipalAssignmentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.databasePrincipalAssignments.delete(
    "kustorptest",
    "kustoCluster",
    "Kustodatabase8",
    "kustoprincipal1",
  );
}

async function main() {
  await kustoDatabasePrincipalAssignmentsDelete();
}

main().catch(console.error);
