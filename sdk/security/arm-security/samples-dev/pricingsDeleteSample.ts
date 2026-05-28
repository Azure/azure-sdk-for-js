// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers').
 *
 * @summary deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers').
 * x-ms-original-file: 2024-01-01/Pricings/DeleteResourcePricingByNameContainers_example.json
 */
async function deleteAPricingOnResourceExampleForContainersPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.pricings.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/demo-containers-rg/providers/Microsoft.ContainerService/managedClusters/demo-aks-cluster",
    "Containers",
  );
}

/**
 * This sample demonstrates how to deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers').
 *
 * @summary deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers').
 * x-ms-original-file: 2024-01-01/Pricings/DeleteResourcePricing_example.json
 */
async function deleteAPricingOnResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.pricings.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/DEMO/providers/Microsoft.Compute/virtualMachines/VM-1",
    "VirtualMachines",
  );
}

async function main(): Promise<void> {
  await deleteAPricingOnResourceExampleForContainersPlan();
  await deleteAPricingOnResource();
}

main().catch(console.error);
