// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetResourcePricingByNameVirtualMachines_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPricingsOnResourceVirtualMachinesPlan(): Promise<void> {
  const scopeId =
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/DEMO/providers/Microsoft.Compute/virtualMachines/VM-1";
  const pricingName = "VirtualMachines";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetPricingByNameCloudPosture_example.json
 */
async function getPricingsOnSubscriptionCloudPosturePlan(): Promise<void> {
  const scopeId = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "CloudPosture";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetPricingByNameContainers_example.json
 */
async function getPricingsOnSubscriptionContainersPlan(): Promise<void> {
  const scopeId = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "Containers";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetPricingByNameDns_example.json
 */
async function getPricingsOnSubscriptionDnsPlan(): Promise<void> {
  const scopeId = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "Dns";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetPricingByNameStorageAccounts_example.json
 */
async function getPricingsOnSubscriptionStorageAccountsPlan(): Promise<void> {
  const scopeId = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "StorageAccounts";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 *
 * @summary Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2024-01-01/examples/Pricings/GetPricingByNameVirtualMachines_example.json
 */
async function getPricingsOnSubscriptionVirtualMachinesPlan(): Promise<void> {
  const scopeId = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "VirtualMachines";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.get(scopeId, pricingName);
  console.log(result);
}

async function main(): Promise<void> {
  await getPricingsOnResourceVirtualMachinesPlan();
  await getPricingsOnSubscriptionCloudPosturePlan();
  await getPricingsOnSubscriptionContainersPlan();
  await getPricingsOnSubscriptionDnsPlan();
  await getPricingsOnSubscriptionStorageAccountsPlan();
  await getPricingsOnSubscriptionVirtualMachinesPlan();
}

main().catch(console.error);
