// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an image.
 *
 * @summary gets an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Get.json
 */
async function getInformationAboutAVirtualMachineImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.images.get("myResourceGroup", "myImage");
  console.log(result);
}

async function main() {
  await getInformationAboutAVirtualMachineImage();
}

main().catch(console.error);
