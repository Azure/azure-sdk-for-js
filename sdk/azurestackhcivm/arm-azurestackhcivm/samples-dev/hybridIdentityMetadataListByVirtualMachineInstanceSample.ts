// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the list of HybridIdentityMetadata of the given vm.
 *
 * @summary returns the list of HybridIdentityMetadata of the given vm.
 * x-ms-original-file: 2025-06-01-preview/HybridIdentityMetadata_ListByVirtualMachineInstance.json
 */
async function hybridIdentityMetadataListByVirtualMachineInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridIdentityMetadata.listByVirtualMachineInstance(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await hybridIdentityMetadataListByVirtualMachineInstances();
}

main().catch(console.error);
