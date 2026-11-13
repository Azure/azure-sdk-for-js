// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Pipeline resource.
 *
 * @summary deletes the specified Pipeline resource.
 * x-ms-original-file: 2026-02-06-preview/deletePipeline.json
 */
async function deletesThePipelineResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.pipelines.delete("testRG", "testPipeline");
}

async function main(): Promise<void> {
  await deletesThePipelineResource();
}

main().catch(console.error);
