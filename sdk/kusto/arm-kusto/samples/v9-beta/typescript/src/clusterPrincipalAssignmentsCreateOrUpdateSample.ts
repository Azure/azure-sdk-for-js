// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Kusto cluster principalAssignment.
 *
 * @summary create a Kusto cluster principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsCreateOrUpdate.json
 */
async function kustoClusterPrincipalAssignmentsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusterPrincipalAssignments.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "kustoprincipal1",
    {
      principalId: "87654321-1234-1234-1234-123456789123",
      principalType: "App",
      role: "AllDatabasesAdmin",
      tenantId: "12345678-1234-1234-1234-123456789123",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterPrincipalAssignmentsCreateOrUpdate();
}

main().catch(console.error);
