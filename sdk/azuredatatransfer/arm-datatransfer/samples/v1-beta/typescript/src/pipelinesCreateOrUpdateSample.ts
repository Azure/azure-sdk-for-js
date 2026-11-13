// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline.
 *
 * @summary creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline.
 * x-ms-original-file: 2026-02-06-preview/createOrUpdatePipeline.json
 */
async function createsOrUpdatesThePipelineResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.createOrUpdate("testRG", "testPipeline", {
    location: "East US",
    properties: { remoteCloud: "testdc" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesThePipelineResource();
}

main().catch(console.error);
