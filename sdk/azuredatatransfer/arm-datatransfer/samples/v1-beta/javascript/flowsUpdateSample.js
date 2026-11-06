// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the flow resource.
 *
 * @summary updates the flow resource.
 * x-ms-original-file: 2026-02-06-preview/patchFlow.json
 */
async function updatesTheFlowResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.flows.update("testRG", "testConnection", "testFlow", {});
}

async function main() {
  await updatesTheFlowResource();
}

main().catch(console.error);
