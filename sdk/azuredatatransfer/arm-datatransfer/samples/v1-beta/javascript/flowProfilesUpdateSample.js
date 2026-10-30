// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to applies partial updates to an existing FlowProfile resource.
 *
 * @summary applies partial updates to an existing FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/patchFlowProfile.json
 */
async function updatesTheFlowprofileResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flowProfiles.update("testRG", "testPipeline", "testFlowProfile", {});
  console.log(result);
}

async function main() {
  await updatesTheFlowprofileResource();
}

main().catch(console.error);
