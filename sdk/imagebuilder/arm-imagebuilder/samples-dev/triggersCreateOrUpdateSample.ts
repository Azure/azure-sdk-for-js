// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Trigger } from "@azure/arm-imagebuilder";
import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a trigger for the specified virtual machine image template
 *
 * @summary Create or update a trigger for the specified virtual machine image template
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/CreateSourceImageTrigger.json
 */
async function createOrUpdateASourceImageTypeTrigger(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["IMAGEBUILDER_RESOURCE_GROUP"] || "myResourceGroup";
  const imageTemplateName = "myImageTemplate";
  const triggerName = "source";
  const parameters: Trigger = { kind: "SourceImage" };
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.triggers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    imageTemplateName,
    triggerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASourceImageTypeTrigger();
}

main().catch(console.error);
