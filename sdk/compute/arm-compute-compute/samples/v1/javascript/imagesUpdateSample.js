// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an image.
 *
 * @summary update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Update.json
 */
async function updatesTagsOfAnImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.update("myResourceGroup", "myImage", {
    properties: {
      sourceVirtualMachine: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
      },
      hyperVGeneration: "V1",
    },
    tags: { department: "HR" },
  });
}

async function main() {
  await updatesTagsOfAnImage();
}

main().catch(console.error);
