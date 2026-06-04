// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to suspend the job identified by job name.
 *
 * @summary suspend the job identified by job name.
 * x-ms-original-file: 2024-10-23/job/suspendJob.json
 */
async function suspendJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.job.suspend("mygroup", "ContoseAutomationAccount", "foo");
}

async function main() {
  await suspendJob();
}

main().catch(console.error);
