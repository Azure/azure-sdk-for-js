// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get the lists of unsupported vm sizes for Service Fabric Managed Clusters.
 *
 * @summary get the lists of unsupported vm sizes for Service Fabric Managed Clusters.
 * x-ms-original-file: 2025-03-01-preview/managedUnsupportedVMSizesList_example.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function listUnsupportedVmSizes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedUnsupportedVMSizes.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listUnsupportedVmSizes();
}

main().catch(console.error);
