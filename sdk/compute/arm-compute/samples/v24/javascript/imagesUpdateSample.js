// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an image.
 *
 * @summary update an image.
 * x-ms-original-file: 2025-11-01/imageExamples/Image_Update.json
 */
async function updatesTagsOfAnImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.images.update("myResourceGroup", "myImage", {
    sourceVirtualMachine: {
      id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
    },
    hyperVGeneration: "V1",
    tags: { department: "HR" },
  });
  console.log(result);
}

async function main() {
  await updatesTagsOfAnImage();
}

main().catch(console.error);
