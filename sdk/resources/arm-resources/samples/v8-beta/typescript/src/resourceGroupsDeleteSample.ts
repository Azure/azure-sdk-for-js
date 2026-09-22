// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 *
 * @summary when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 * x-ms-original-file: 2025-04-01/ForceDeleteVMsAndVMSSInResourceGroup.json
 */
async function forceDeleteAllTheVirtualMachinesAndVirtualMachineScaleSetsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  await client.resourceGroups.delete("my-resource-group", {
    forceDeletionTypes:
      "Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets",
  });
}

/**
 * This sample demonstrates how to when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 *
 * @summary when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 * x-ms-original-file: 2025-04-01/ForceDeleteVMsInResourceGroup.json
 */
async function forceDeleteAllTheVirtualMachinesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  await client.resourceGroups.delete("my-resource-group", {
    forceDeletionTypes: "Microsoft.Compute/virtualMachines",
  });
}

async function main(): Promise<void> {
  await forceDeleteAllTheVirtualMachinesAndVirtualMachineScaleSetsInAResourceGroup();
  await forceDeleteAllTheVirtualMachinesInAResourceGroup();
}

main().catch(console.error);
