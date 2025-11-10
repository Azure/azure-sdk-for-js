// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric managed application type name resource with the specified name.
 *
 * @summary create or update a Service Fabric managed application type name resource with the specified name.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeNamePutOperation_example.json
 */
async function putAnApplicationType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypes.createOrUpdate("resRg", "myCluster", "myAppType", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAnApplicationType();
}

main().catch(console.error);
