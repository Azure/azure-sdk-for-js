// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the pipeline metadata associated with a specified pipeline.
 *
 * @summary retrieves the pipeline metadata associated with a specified pipeline.
 * x-ms-original-file: 2026-02-06-preview/AzureDataTransfer_ListPipelineMetadata.json
 */
async function azureDataTransferListPipelineMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new AzureDataTransferClient(credential);
  const result = await client.azureDataTransfer.listPipelineMetadata({ pipeline: "testPipeline" });
  console.log(result);
}

async function main() {
  await azureDataTransferListPipelineMetadata();
}

main().catch(console.error);
