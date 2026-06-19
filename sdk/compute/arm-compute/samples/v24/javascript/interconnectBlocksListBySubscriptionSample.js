// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the Interconnect Blocks in the subscription. Use the nextLink property in the response to get the next page of Interconnect Blocks.
 *
 * @summary lists all of the Interconnect Blocks in the subscription. Use the nextLink property in the response to get the next page of Interconnect Blocks.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_ListBySubscription.json
 */
async function listInterconnectBlocksInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.interconnectBlocks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInterconnectBlocksInASubscription();
}

main().catch(console.error);
