// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a private access tags
 *
 * @summary patch a private access tags
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Update.json
 */
async function updateAPrivateAccessResourceTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.privateAccesses.update("myResourceGroup", "myPrivateAccess", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateAPrivateAccessResourceTags();
}

main().catch(console.error);
