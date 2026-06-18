// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the size of a Compute Instance.
 *
 * @summary updates the size of a Compute Instance.
 * x-ms-original-file: 2026-03-15-preview/Compute/resize.json
 */
async function listVMSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.resize("testrg123", "workspaces123", "compute123", {
    targetVMSize: "Standard_DS11_v2",
  });
}

async function main() {
  await listVMSizes();
}

main().catch(console.error);
