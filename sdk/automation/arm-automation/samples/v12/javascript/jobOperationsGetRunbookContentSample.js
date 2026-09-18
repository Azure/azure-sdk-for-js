// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the runbook content of the job identified by job name.
 *
 * @summary retrieve the runbook content of the job identified by job name.
 * x-ms-original-file: 2024-10-23/job/getJobRunbookContent.json
 */
async function getJobRunbookContent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobOperations.getRunbookContent(
    "mygroup",
    "ContoseAutomationAccount",
    "foo",
  );
  console.log(result);
}

async function main() {
  await getJobRunbookContent();
}

main().catch(console.error);
