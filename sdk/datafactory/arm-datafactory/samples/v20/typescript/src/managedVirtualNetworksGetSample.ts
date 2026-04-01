// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed Virtual Network.
 *
 * @summary gets a managed Virtual Network.
 * x-ms-original-file: 2018-06-01/ManagedVirtualNetworks_Get.json
 */
async function managedVirtualNetworksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedVirtualNetworks.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedVirtualNetworksGet();
}

main().catch(console.error);
