// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update an image.
 *
 * @summary Update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/imageExamples/Image_Update.json
 */
async function updatesTagsOfAnImage() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const imageName = "myImage";
  const parameters = {
    hyperVGeneration: "V1",
    sourceVirtualMachine: {
      id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
    },
    tags: { department: "HR" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.images.beginUpdateAndWait(resourceGroupName, imageName, parameters);
  console.log(result);
}

async function main() {
  await updatesTagsOfAnImage();
}

main().catch(console.error);
