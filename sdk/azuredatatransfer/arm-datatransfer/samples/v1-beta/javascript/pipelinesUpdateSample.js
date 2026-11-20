// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline.
 *
 * @summary applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline.
 * x-ms-original-file: 2026-02-06-preview/patchPipeline.json
 */
async function updatesThePipelineResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.pipelines.update("testRG", "testPipeline", {});
}

async function main() {
  await updatesThePipelineResource();
}

main().catch(console.error);
