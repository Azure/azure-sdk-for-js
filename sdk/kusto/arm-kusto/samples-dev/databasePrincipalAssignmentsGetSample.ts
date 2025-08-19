// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Kusto cluster database principalAssignment.
 *
 * @summary Gets a Kusto cluster database principalAssignment.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoDatabasePrincipalAssignmentsGet.json
 */

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoDatabasePrincipalAssignmentsGet(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const databaseName = "Kustodatabase8";
  const principalAssignmentName = "kustoprincipal1";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databasePrincipalAssignments.get(
    resourceGroupName,
    clusterName,
    databaseName,
    principalAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasePrincipalAssignmentsGet();
}

main().catch(console.error);
