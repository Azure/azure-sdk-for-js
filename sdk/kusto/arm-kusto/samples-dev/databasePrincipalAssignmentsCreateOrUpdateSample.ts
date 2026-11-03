// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Kusto cluster database principalAssignment.
 *
 * @summary creates a Kusto cluster database principalAssignment.
 * x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsCreateOrUpdate.json
 */
async function kustoDatabasePrincipalAssignmentsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databasePrincipalAssignments.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "Kustodatabase8",
    "kustoprincipal1",
    {
      principalId: "87654321-1234-1234-1234-123456789123",
      principalType: "App",
      role: "Admin",
      tenantId: "12345678-1234-1234-1234-123456789123",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasePrincipalAssignmentsCreateOrUpdate();
}

main().catch(console.error);
