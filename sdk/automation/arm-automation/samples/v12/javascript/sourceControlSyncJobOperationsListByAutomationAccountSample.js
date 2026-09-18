// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of source control sync jobs.
 *
 * @summary retrieve a list of source control sync jobs.
 * x-ms-original-file: 2024-10-23/sourceControlSyncJob/getAllSourceControlSyncJobs.json
 */
async function getAListOfSourceControlSyncJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControlSyncJobOperations.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
    "MySourceControl",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfSourceControlSyncJobs();
}

main().catch(console.error);
