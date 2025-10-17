// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute listWithProperties
 *
 * @summary execute listWithProperties
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImages_ListWithProperties_MaximumSet_Gen.json
 */
async function virtualMachineImagesListWithPropertiesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listWithProperties(
    "eastus",
    "MicrosoftWindowsServer",
    "WindowsServer",
    "2022-datacenter-azure-edition",
    "Properties",
    { top: 4, orderby: "aa" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to execute listWithProperties
 *
 * @summary execute listWithProperties
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImages_ListWithProperties_MinimumSet_Gen.json
 */
async function virtualMachineImagesListWithPropertiesMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listWithProperties(
    "eastus",
    "MicrosoftWindowsServer",
    "WindowsServer",
    "2022-datacenter-azure-edition",
    "Properties",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImagesListWithPropertiesMaximumSet();
  await virtualMachineImagesListWithPropertiesMinimumSet();
}

main().catch(console.error);
