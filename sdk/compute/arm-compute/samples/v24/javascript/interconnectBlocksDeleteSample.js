// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Interconnect Block. The operation is only allowed when there are no virtual machines or VMSS VM instances associated with the Interconnect Block.
 *
 * @summary deletes an Interconnect Block. The operation is only allowed when there are no virtual machines or VMSS VM instances associated with the Interconnect Block.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_Delete.json
 */
async function deleteAnInterconnectBlock() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.interconnectBlocks.delete("myResourceGroup", "myInterconnectBlock");
}

async function main() {
  await deleteAnInterconnectBlock();
}

main().catch(console.error);
