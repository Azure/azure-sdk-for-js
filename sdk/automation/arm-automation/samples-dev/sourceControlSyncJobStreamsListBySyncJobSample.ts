// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of sync job streams identified by sync job id.
 *
 * @summary retrieve a list of sync job streams identified by sync job id.
 * x-ms-original-file: 2024-10-23/sourceControlSyncJobStreams/getSourceControlSyncJobStreams.json
 */
async function getAListOfSyncJobStreamsIdentifiedBySyncJobId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControlSyncJobStreams.listBySyncJob(
    "rg",
    "myAutomationAccount33",
    "MySourceControl",
    "ce6fe3e3-9db3-4096-a6b4-82bfb4c10a2b",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfSyncJobStreamsIdentifiedBySyncJobId();
}

main().catch(console.error);
