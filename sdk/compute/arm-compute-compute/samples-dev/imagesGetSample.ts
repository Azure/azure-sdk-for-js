// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an image.
 *
 * @summary gets an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Get.json
 */
async function getInformationAboutAVirtualMachineImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.images.get("myResourceGroup", "myImage");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAVirtualMachineImage();
}

main().catch(console.error);
