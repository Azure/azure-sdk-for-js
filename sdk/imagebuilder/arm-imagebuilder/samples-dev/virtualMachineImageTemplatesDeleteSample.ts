// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a virtual machine image template
 *
 * @summary delete a virtual machine image template
 * x-ms-original-file: 2025-10-01/DeleteImageTemplate.json
 */
async function deleteAnImageTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.delete("myResourceGroup", "myImageTemplate");
}

async function main(): Promise<void> {
  await deleteAnImageTemplate();
}

main().catch(console.error);
