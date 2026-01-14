// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric application type name resource created or in the process of being created in the Service Fabric managed cluster resource.
 *
 * @summary get a Service Fabric application type name resource created or in the process of being created in the Service Fabric managed cluster resource.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeNameGetOperation_example.json
 */
async function getAnApplicationType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypes.get("resRg", "myCluster", "myAppType");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnApplicationType();
}

main().catch(console.error);
