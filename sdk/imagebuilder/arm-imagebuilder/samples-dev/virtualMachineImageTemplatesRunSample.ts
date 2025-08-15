// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create artifacts from a existing image template
 *
 * @summary Create artifacts from a existing image template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/RunImageTemplate.json
 */
async function createImageSFromExistingImageTemplate(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.beginRunAndWait(
    resourceGroupName,
    imageTemplateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createImageSFromExistingImageTemplate();
}

main().catch(console.error);
