// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the sync job for a source control.
 *
 * @summary creates the sync job for a source control.
 * x-ms-original-file: 2024-10-23/sourceControlSyncJob/createSourceControlSyncJob.json
 */
async function createOrUpdateASourceControlSyncJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControlSyncJob.create(
    "rg",
    "myAutomationAccount33",
    "MySourceControl",
    "ce6fe3e3-9db3-4096-a6b4-82bfb4c10a9a",
    { commitId: "9de0980bfb45026a3d97a1b0522d98a9f604226e" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASourceControlSyncJob();
}

main().catch(console.error);
