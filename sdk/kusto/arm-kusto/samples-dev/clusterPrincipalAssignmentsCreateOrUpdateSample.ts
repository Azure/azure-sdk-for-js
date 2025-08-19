// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a Kusto cluster principalAssignment.
 *
 * @summary Create a Kusto cluster principalAssignment.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoClusterPrincipalAssignmentsCreateOrUpdate.json
 */

import type { ClusterPrincipalAssignment } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClusterPrincipalAssignmentsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const principalAssignmentName = "kustoprincipal1";
  const parameters: ClusterPrincipalAssignment = {
    principalId: "87654321-1234-1234-1234-123456789123",
    principalType: "App",
    role: "AllDatabasesAdmin",
    tenantId: "12345678-1234-1234-1234-123456789123",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusterPrincipalAssignments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    principalAssignmentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterPrincipalAssignmentsCreateOrUpdate();
}

main().catch(console.error);
