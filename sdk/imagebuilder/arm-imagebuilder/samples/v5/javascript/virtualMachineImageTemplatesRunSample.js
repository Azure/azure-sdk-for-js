// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create artifacts from a existing image template
 *
 * @summary create artifacts from a existing image template
 * x-ms-original-file: 2025-10-01/RunImageTemplate.json
 */
async function createImageSFromExistingImageTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.run("myResourceGroup", "myImageTemplate");
}

async function main() {
  await createImageSFromExistingImageTemplate();
}

main().catch(console.error);
