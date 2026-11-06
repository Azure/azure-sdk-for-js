// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the specified Pipeline resource.
 *
 * @summary retrieves the specified Pipeline resource.
 * x-ms-original-file: 2026-02-06-preview/getPipeline.json
 */
async function getsPipelineResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.get("testRG", "testPipeline");
  console.log(result);
}

async function main() {
  await getsPipelineResource();
}

main().catch(console.error);
