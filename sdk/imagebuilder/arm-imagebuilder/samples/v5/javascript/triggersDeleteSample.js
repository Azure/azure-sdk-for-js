// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a trigger for the specified virtual machine image template
 *
 * @summary delete a trigger for the specified virtual machine image template
 * x-ms-original-file: 2025-10-01/DeleteTrigger.json
 */
async function deleteATriggerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  await client.triggers.delete("myResourceGroup", "myImageTemplate", "trigger1");
}

async function main() {
  await deleteATriggerResource();
}

main().catch(console.error);
