// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetPricingByNameCloudPosture_example.json
 */
async function getPricingsOnSubscriptionCloudPosturePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "CloudPosture",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetPricingByNameContainers_example.json
 */
async function getPricingsOnSubscriptionContainersPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "Containers",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetPricingByNameDns_example.json
 */
async function getPricingsOnSubscriptionDnsPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "Dns",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetPricingByNameStorageAccounts_example.json
 */
async function getPricingsOnSubscriptionStorageAccountsPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "StorageAccounts",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetPricingByNameVirtualMachines_example.json
 */
async function getPricingsOnSubscriptionVirtualMachinesPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "VirtualMachines",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetResourcePricingByNameContainers_example.json
 */
async function getPricingsOnResourceContainersPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/demo-containers-rg/providers/Microsoft.ContainerService/managedClusters/demo-aks-cluster",
    "Containers",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: 2024-01-01/Pricings/GetResourcePricingByNameVirtualMachines_example.json
 */
async function getPricingsOnResourceVirtualMachinesPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/DEMO/providers/Microsoft.Compute/virtualMachines/VM-1",
    "VirtualMachines",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPricingsOnSubscriptionCloudPosturePlan();
  await getPricingsOnSubscriptionContainersPlan();
  await getPricingsOnSubscriptionDnsPlan();
  await getPricingsOnSubscriptionStorageAccountsPlan();
  await getPricingsOnSubscriptionVirtualMachinesPlan();
  await getPricingsOnResourceContainersPlan();
  await getPricingsOnResourceVirtualMachinesPlan();
}

main().catch(console.error);
