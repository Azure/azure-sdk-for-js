// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the destination endpoint ports for the specified flow.
 *
 * @summary get the destination endpoint ports for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/getFlowDestinationEndpointPorts.json
 */
async function getTheFlowStreamDestinationEndpointPorts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.getDestinationEndpointPorts(
    "testRG",
    "testConnection",
    "testFlow",
  );
  console.log(result);
}

async function main() {
  await getTheFlowStreamDestinationEndpointPorts();
}

main().catch(console.error);
