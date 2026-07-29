// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to abort the given workflow.
 *
 * @summary abort the given workflow.
 * x-ms-original-file: 2022-09-01/Workflows_Abort.json
 */
async function workflowsAbort(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.workflows.abort(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "7ffd50b3-5574-478d-9ff2-9371bc42ce68",
  );
}

async function main(): Promise<void> {
  await workflowsAbort();
}

main().catch(console.error);
