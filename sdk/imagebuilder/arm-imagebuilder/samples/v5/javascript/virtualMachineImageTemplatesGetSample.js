// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about a virtual machine image template
 *
 * @summary get information about a virtual machine image template
 * x-ms-original-file: 2025-10-01/GetImageTemplate.json
 */
async function retrieveAnImageTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.get(
    "myResourceGroup",
    "myImageTemplate",
  );
  console.log(result);
}

async function main() {
  await retrieveAnImageTemplate();
}

main().catch(console.error);
