// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a managed private endpoint.
 *
 * @summary Creates a managed private endpoint.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoManagedPrivateEndpointsCreateOrUpdate.json
 */

import type { ManagedPrivateEndpoint } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoManagedPrivateEndpointsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const managedPrivateEndpointName = "managedPrivateEndpointTest";
  const parameters: ManagedPrivateEndpoint = {
    groupId: "blob",
    privateLinkResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/storageAccountTest",
    requestMessage: "Please Approve.",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    managedPrivateEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoManagedPrivateEndpointsCreateOrUpdate();
}

main().catch(console.error);
