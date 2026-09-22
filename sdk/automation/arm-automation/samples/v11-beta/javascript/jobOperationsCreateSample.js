// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a job of the runbook.
 *
 * @summary create a job of the runbook.
 * x-ms-original-file: 2024-10-23/job/createJob.json
 */
async function createJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobOperations.create("mygroup", "ContoseAutomationAccount", "foo", {
    parameters: { key01: "value01", key02: "value02" },
    runOn: "",
    runbook: { name: "TestRunbook" },
  });
  console.log(result);
}

async function main() {
  await createJob();
}

main().catch(console.error);
