// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline.
 *
 * @summary applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline.
 * x-ms-original-file: 2026-02-06-preview/patchPipeline.json
 */
async function updatesThePipelineResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.pipelines.update("testRG", "testPipeline", {});
}

async function main(): Promise<void> {
  await updatesThePipelineResource();
}

main().catch(console.error);
