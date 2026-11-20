// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the flow resource.
 *
 * @summary deletes the flow resource.
 * x-ms-original-file: 2026-02-06-preview/deleteFlow.json
 */
async function deletesTheFlowResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.flows.delete("testRG", "testConnection", "testFlow");
}

async function main() {
  await deletesTheFlowResource();
}

main().catch(console.error);
