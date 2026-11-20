// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a list of FlowProfile resources associated with a specified pipeline.
 *
 * @summary retrieves a list of FlowProfile resources associated with a specified pipeline.
 * x-ms-original-file: 2026-02-06-preview/AzureDataTransfer_ListFlowProfiles_MaximumSet_Gen.json
 */
async function azureDataTransferListFlowProfilesMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new AzureDataTransferClient(credential);
  const result = await client.azureDataTransfer.listFlowProfiles({});
  console.log(result);
}

async function main() {
  await azureDataTransferListFlowProfilesMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
