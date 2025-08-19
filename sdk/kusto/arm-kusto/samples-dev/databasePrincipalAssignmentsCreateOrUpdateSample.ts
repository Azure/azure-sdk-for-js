// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a Kusto cluster database principalAssignment.
 *
 * @summary Creates a Kusto cluster database principalAssignment.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoDatabasePrincipalAssignmentsCreateOrUpdate.json
 */

import type { DatabasePrincipalAssignment } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoDatabasePrincipalAssignmentsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const databaseName = "Kustodatabase8";
  const principalAssignmentName = "kustoprincipal1";
  const parameters: DatabasePrincipalAssignment = {
    principalId: "87654321-1234-1234-1234-123456789123",
    principalType: "App",
    role: "Admin",
    tenantId: "12345678-1234-1234-1234-123456789123",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databasePrincipalAssignments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    principalAssignmentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasePrincipalAssignmentsCreateOrUpdate();
}

main().catch(console.error);
