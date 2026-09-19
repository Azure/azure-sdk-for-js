// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of jobs streams identified by job name.
 *
 * @summary retrieve a list of jobs streams identified by job name.
 * x-ms-original-file: 2024-10-23/job/listJobStreamsByJob.json
 */
async function listJobStreamsByJobName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobStreamOperations.listByJob(
    "mygroup",
    "ContoseAutomationAccount",
    "foo",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listJobStreamsByJobName();
}

main().catch(console.error);
