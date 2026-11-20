// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to applies partial updates to an existing FlowProfile resource.
 *
 * @summary applies partial updates to an existing FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/patchFlowProfile.json
 */
async function updatesTheFlowprofileResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flowProfiles.update("testRG", "testPipeline", "testFlowProfile", {});
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheFlowprofileResource();
}

main().catch(console.error);
