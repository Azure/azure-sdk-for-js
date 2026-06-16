// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Kusto cluster principalAssignment.
 *
 * @summary deletes a Kusto cluster principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsDelete.json
 */
async function kustoClusterPrincipalAssignmentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusterPrincipalAssignments.delete("kustorptest", "kustoCluster", "kustoprincipal1");
}

async function main() {
  await kustoClusterPrincipalAssignmentsDelete();
}

main().catch(console.error);
