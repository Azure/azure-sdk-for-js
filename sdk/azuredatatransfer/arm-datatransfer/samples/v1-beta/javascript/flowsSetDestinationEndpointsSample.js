// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to set the destination endpoints for the specified flow.
 *
 * @summary set the destination endpoints for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/setFlowDestinationEndpoints.json
 */
async function setTheFlowStreamDestinationEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.setDestinationEndpoints(
    "testRG",
    "testConnection",
    "testFlow",
    { endpoints: ["10.0.0.1"] },
  );
  console.log(result);
}

async function main() {
  await setTheFlowStreamDestinationEndpoints();
}

main().catch(console.error);
