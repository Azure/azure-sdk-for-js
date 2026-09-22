// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the job output identified by job name.
 *
 * @summary retrieve the job output identified by job name.
 * x-ms-original-file: 2024-10-23/job/getJobOutput.json
 */
async function getJobOutput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobOperations.getOutput("mygroup", "ContoseAutomationAccount", "foo");
  console.log(result);
}

async function main(): Promise<void> {
  await getJobOutput();
}

main().catch(console.error);
