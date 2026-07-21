// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the job schedule identified by job schedule name.
 *
 * @summary delete the job schedule identified by job schedule name.
 * x-ms-original-file: 2024-10-23/deleteJobSchedule.json
 */
async function deleteAJobSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.jobScheduleOperations.delete(
    "rg",
    "ContoseAutomationAccount",
    "0fa462ba-3aa2-4138-83ca-9ebc3bc55cdc",
  );
}

async function main() {
  await deleteAJobSchedule();
}

main().catch(console.error);
