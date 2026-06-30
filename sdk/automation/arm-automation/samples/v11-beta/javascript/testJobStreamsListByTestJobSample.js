// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of test job streams identified by runbook name.
 *
 * @summary retrieve a list of test job streams identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/listTestJobStreamsByJob.json
 */
async function listJobStreamsByJobName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.testJobStreams.listByTestJob(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listJobStreamsByJobName();
}

main().catch(console.error);
