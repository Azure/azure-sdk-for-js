// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the job schedule identified by job schedule name.
 *
 * @summary retrieve the job schedule identified by job schedule name.
 * x-ms-original-file: 2024-10-23/getJobSchedule.json
 */
async function getAJobSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobSchedule.get(
    "rg",
    "ContoseAutomationAccount",
    "0fa462ba-3aa2-4138-83ca-9ebc3bc55cdc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAJobSchedule();
}

main().catch(console.error);
