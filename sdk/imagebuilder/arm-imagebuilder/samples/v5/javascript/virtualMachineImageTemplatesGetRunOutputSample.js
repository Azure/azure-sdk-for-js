// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified run output for the specified image template resource
 *
 * @summary get the specified run output for the specified image template resource
 * x-ms-original-file: 2025-10-01/GetRunOutput.json
 */
async function retrieveSingleRunOutput() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.virtualMachineImageTemplates.getRunOutput(
    "myResourceGroup",
    "myImageTemplate",
    "myManagedImageOutput",
  );
  console.log(result);
}

async function main() {
  await retrieveSingleRunOutput();
}

main().catch(console.error);
