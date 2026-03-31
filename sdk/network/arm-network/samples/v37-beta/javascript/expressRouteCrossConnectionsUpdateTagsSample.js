// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an express route cross connection tags.
 *
 * @summary updates an express route cross connection tags.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionUpdateTags.json
 */
async function updateExpressRouteCrossConnectionTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.updateTags(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main() {
  await updateExpressRouteCrossConnectionTags();
}

main().catch(console.error);
