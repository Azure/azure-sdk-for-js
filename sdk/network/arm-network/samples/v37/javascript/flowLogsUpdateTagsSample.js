// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tags of the specified flow log.
 *
 * @summary update tags of the specified flow log.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogUpdateTags.json
 */
async function updateFlowLogTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.flowLogs.updateTags("rg1", "nw", "fl", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateFlowLogTags();
}

main().catch(console.error);
