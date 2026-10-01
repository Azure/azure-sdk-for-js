// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified trigger for the specified image template resource
 *
 * @summary get the specified trigger for the specified image template resource
 * x-ms-original-file: 2025-10-01/GetTrigger.json
 */
async function getATriggerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.triggers.get("myResourceGroup", "myImageTemplate", "source");
  console.log(result);
}

async function main() {
  await getATriggerResource();
}

main().catch(console.error);
