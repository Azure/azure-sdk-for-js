// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns supported virtual machine sizes for resize.
 *
 * @summary returns supported virtual machine sizes for resize.
 * x-ms-original-file: 2026-03-15-preview/Compute/getAllowedVMSizesForResize.json
 */
async function listVMSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.computeOperations.getAllowedResizeSizes(
    "testrg123",
    "workspaces123",
    "compute123",
  );
  console.log(result);
}

async function main() {
  await listVMSizes();
}

main().catch(console.error);
