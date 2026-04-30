// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric managed application resource created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary get a Service Fabric managed application resource created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: 2026-02-01/ApplicationGetOperation_example.json
 */
async function getAnApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.get("resRg", "myCluster", "myApp");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnApplication();
}

main().catch(console.error);
