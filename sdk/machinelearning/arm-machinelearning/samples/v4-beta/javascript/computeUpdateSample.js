// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation.
 *
 * @summary updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation.
 * x-ms-original-file: 2025-12-01/Compute/patch.json
 */
async function updateAAmlComputeCompute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.compute.update("testrg123", "workspaces123", "compute123", {
    properties: {
      scaleSettings: { maxNodeCount: 4, minNodeCount: 4, nodeIdleTimeBeforeScaleDown: "PT5M" },
    },
  });
  console.log(result);
}

async function main() {
  await updateAAmlComputeCompute();
}

main().catch(console.error);
