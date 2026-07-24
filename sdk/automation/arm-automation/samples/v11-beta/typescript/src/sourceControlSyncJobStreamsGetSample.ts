// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a sync job stream identified by stream id.
 *
 * @summary retrieve a sync job stream identified by stream id.
 * x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreamsByStreamId.json
 */
async function getASyncJobStreamIdentifiedBySyncJobStreamId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlSyncJobStreams.get(
    "rg",
    "myAutomationAccount33",
    "MySourceControl",
    "ce6fe3e3-9db3-4096-a6b4-82bfb4c10a2b",
    "b86c5c31-e9fd-4734-8764-ddd6c101e706_00636596855139029522_00000000000000000007",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASyncJobStreamIdentifiedBySyncJobStreamId();
}

main().catch(console.error);
