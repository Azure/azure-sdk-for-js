// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of jobs.
 *
 * @summary retrieve a list of jobs.
 * x-ms-original-file: 2024-10-23/job/listJobsByAutomationAccount.json
 */
async function listJobsByAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.job.listByAutomationAccount(
    "mygroup",
    "ContosoAutomationAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listJobsByAutomationAccount();
}

main().catch(console.error);
