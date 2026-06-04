// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the schedule identified by schedule name.
 *
 * @summary update the schedule identified by schedule name.
 * x-ms-original-file: 2024-10-23/updateSchedule.json
 */
async function updateASchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.schedule.update("rg", "myAutomationAccount33", "mySchedule", {
    name: "mySchedule",
    description: "my updated description of schedule goes here",
    isEnabled: false,
  });
  console.log(result);
}

async function main() {
  await updateASchedule();
}

main().catch(console.error);
