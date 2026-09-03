// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create artifacts from a existing image template
 *
 * @summary create artifacts from a existing image template
 * x-ms-original-file: 2025-10-01/RunImageTemplate.json
 */
async function createImageSFromExistingImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.run("myResourceGroup", "myImageTemplate");
}

async function main(): Promise<void> {
  await createImageSFromExistingImageTemplate();
}

main().catch(console.error);
