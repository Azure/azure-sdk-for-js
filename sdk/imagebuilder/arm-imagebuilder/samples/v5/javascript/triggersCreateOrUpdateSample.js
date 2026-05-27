// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a trigger for the specified virtual machine image template
 *
 * @summary create or update a trigger for the specified virtual machine image template
 * x-ms-original-file: 2025-10-01/CreateSourceImageTrigger.json
 */
async function createOrUpdateASourceImageTypeTrigger() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.triggers.createOrUpdate(
    "myResourceGroup",
    "myImageTemplate",
    "source",
    { properties: { kind: "SourceImage" } },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASourceImageTypeTrigger();
}

main().catch(console.error);
