// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a virtual machine image template
 *
 * @summary Delete a virtual machine image template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/DeleteImageTemplate.json
 */

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnImageTemplate(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.beginDeleteAndWait(
    resourceGroupName,
    imageTemplateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnImageTemplate();
}

main().catch(console.error);
