// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the source control sync job identified by job id.
 *
 * @summary retrieve the source control sync job identified by job id.
 * x-ms-original-file: 2024-10-23/sourceControlSyncJob/getSourceControlSyncJob.json
 */
async function getASourceControlSyncJobByJobId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlSyncJob.get(
    "rg",
    "myAutomationAccount33",
    "MySourceControl",
    "ce6fe3e3-9db3-4096-a6b4-82bfb4c10a9a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASourceControlSyncJobByJobId();
}

main().catch(console.error);
