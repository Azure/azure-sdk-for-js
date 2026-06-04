// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the schedule identified by schedule name.
 *
 * @summary retrieve the schedule identified by schedule name.
 * x-ms-original-file: 2024-10-23/getSchedule.json
 */
async function getASchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.schedule.get("rg", "myAutomationAccount33", "mySchedule");
  console.log(result);
}

async function main() {
  await getASchedule();
}

main().catch(console.error);
