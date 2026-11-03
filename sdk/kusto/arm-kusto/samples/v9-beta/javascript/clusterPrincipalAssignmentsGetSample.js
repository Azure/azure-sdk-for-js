// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Kusto cluster principalAssignment.
 *
 * @summary gets a Kusto cluster principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsGet.json
 */
async function kustoClusterPrincipalAssignmentsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusterPrincipalAssignments.get(
    "kustorptest",
    "kustoCluster",
    "kustoprincipal1",
  );
  console.log(result);
}

async function main() {
  await kustoClusterPrincipalAssignmentsGet();
}

main().catch(console.error);
