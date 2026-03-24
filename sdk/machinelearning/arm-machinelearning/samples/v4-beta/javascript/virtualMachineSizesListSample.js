// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns supported VM Sizes in a location
 *
 * @summary returns supported VM Sizes in a location
 * x-ms-original-file: 2025-12-01/VirtualMachineSize/list.json
 */
async function listVMSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineSizes.list("eastus");
  console.log(result);
}

async function main() {
  await listVMSizes();
}

main().catch(console.error);
