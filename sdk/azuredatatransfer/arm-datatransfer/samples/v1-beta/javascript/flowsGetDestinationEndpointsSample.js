// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the destination endpoints for the specified flow.
 *
 * @summary get the destination endpoints for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/getFlowDestinationEndpoints.json
 */
async function getTheFlowStreamDestinationEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.getDestinationEndpoints("testRG", "testConnection", "testFlow");
  console.log(result);
}

async function main() {
  await getTheFlowStreamDestinationEndpoints();
}

main().catch(console.error);
