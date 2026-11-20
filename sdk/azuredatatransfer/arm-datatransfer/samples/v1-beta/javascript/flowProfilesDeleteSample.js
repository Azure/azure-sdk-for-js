// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified FlowProfile resource.
 *
 * @summary deletes the specified FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/deleteFlowProfile.json
 */
async function deletesTheFlowprofileResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.flowProfiles.delete("testRG", "testPipeline", "testFlowProfile");
}

async function main() {
  await deletesTheFlowprofileResource();
}

main().catch(console.error);
