// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get unsupported vm size for Service Fabric Managed Clusters.
 *
 * @summary get unsupported vm size for Service Fabric Managed Clusters.
 * x-ms-original-file: 2025-03-01-preview/managedUnsupportedVMSizesGet_example.json
 */
async function getUnsupportedVmSizes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.managedUnsupportedVMSizes.get("eastus", "Standard_B1ls1");
  console.log(result);
}

async function main(): Promise<void> {
  await getUnsupportedVmSizes();
}

main().catch(console.error);
