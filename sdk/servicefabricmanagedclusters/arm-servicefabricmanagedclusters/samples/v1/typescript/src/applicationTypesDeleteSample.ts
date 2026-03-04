// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric managed application type name resource with the specified name.
 *
 * @summary delete a Service Fabric managed application type name resource with the specified name.
 * x-ms-original-file: 2026-02-01/ApplicationTypeNameDeleteOperation_example.json
 */
async function deleteAnApplicationType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applicationTypes.delete("resRg", "myCluster", "myAppType");
}

async function main(): Promise<void> {
  await deleteAnApplicationType();
}

main().catch(console.error);
