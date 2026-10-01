// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a virtual machine image template
 *
 * @summary delete a virtual machine image template
 * x-ms-original-file: 2025-10-01/DeleteImageTemplate.json
 */
async function deleteAnImageTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.virtualMachineImageTemplates.delete("myResourceGroup", "myImageTemplate");
}

async function main() {
  await deleteAnImageTemplate();
}

main().catch(console.error);
