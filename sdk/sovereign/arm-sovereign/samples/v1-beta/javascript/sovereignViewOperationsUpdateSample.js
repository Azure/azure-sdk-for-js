// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Sovereign View resource.
 *
 * @summary updates the Sovereign View resource.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Update.json
 */
async function sovereignViewOperationsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.update("ExampleResourceGroup", "ExampleSV", {
    tags: { tag1: "MCFS", tag2: "updated" },
    identity: { type: "SystemAssigned" },
  });
  console.log(result);
}

async function main() {
  await sovereignViewOperationsUpdate();
}

main().catch(console.error);
