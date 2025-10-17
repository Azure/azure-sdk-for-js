// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an image.
 *
 * @summary update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Update.json
 */
async function updatesTagsOfAnImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await updatesTagsOfAnImage();
}

main().catch(console.error);
