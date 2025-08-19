// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified run output for the specified image template resource
 *
 * @summary Get the specified run output for the specified image template resource
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/GetRunOutput.json
 */

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveSingleRunOutput(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const runOutputName = "myManagedImageOutput";
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.getRunOutput(
    resourceGroupName,
    imageTemplateName,
    runOutputName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveSingleRunOutput();
}

main().catch(console.error);
