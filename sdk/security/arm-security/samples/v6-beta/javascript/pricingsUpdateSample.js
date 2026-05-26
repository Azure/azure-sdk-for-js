// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutPricingByNamePartialSuccess_example.json
 */
async function updatePricingOnSubscriptionExampleForCloudPosturePlanPartialSuccess() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "CloudPosture",
    { pricingTier: "Standard" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutPricingByName_example.json
 */
async function updatePricingOnSubscriptionExampleForCloudPosturePlan() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "CloudPosture",
    { pricingTier: "Standard" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutPricingVMsByName_example.json
 */
async function updatePricingOnSubscriptionExampleForVirtualMachinesPlan() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "VirtualMachines",
    { enforce: "True", pricingTier: "Standard", subPlan: "P2" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutResourcePricingByNameContainersACR_example.json
 */
async function updatePricingOnResourceContainerRegistryACR() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myContainerRegistry",
    "Containers",
    {
      pricingTier: "Standard",
      extensions: [
        { name: "ContainerRegistriesVulnerabilityAssessments", isEnabled: "True" },
        { name: "ContainerIntegrityContribution", isEnabled: "True" },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutResourcePricingByNameContainers_example.json
 */
async function updatePricingOnResourceExampleForContainersPlan() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/demo-containers-rg/providers/Microsoft.ContainerService/managedClusters/demo-aks-cluster",
    "Containers",
    {
      pricingTier: "Standard",
      extensions: [
        { name: "ContainerRegistriesVulnerabilityAssessments", isEnabled: "True" },
        { name: "ContainerSensor", isEnabled: "True" },
        { name: "AgentlessDiscoveryForKubernetes", isEnabled: "True" },
        {
          name: "AgentlessVmScanning",
          additionalExtensionProperties: { ExclusionTags: "[]" },
          isEnabled: "True",
        },
        { name: "ContainerIntegrityContribution", isEnabled: "True" },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 *
 * @summary updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1').
 * x-ms-original-file: 2024-01-01/Pricings/PutResourcePricingByNameVirtualMachines_example.json
 */
async function updatePricingOnResourceExampleForVirtualMachinesPlan() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.pricings.update(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/DEMO/providers/Microsoft.Compute/virtualMachines/VM-1",
    "virtualMachines",
    { pricingTier: "Standard", subPlan: "P1" },
  );
  console.log(result);
}

async function main() {
  await updatePricingOnSubscriptionExampleForCloudPosturePlanPartialSuccess();
  await updatePricingOnSubscriptionExampleForCloudPosturePlan();
  await updatePricingOnSubscriptionExampleForVirtualMachinesPlan();
  await updatePricingOnResourceContainerRegistryACR();
  await updatePricingOnResourceExampleForContainersPlan();
  await updatePricingOnResourceExampleForVirtualMachinesPlan();
}

main().catch(console.error);
