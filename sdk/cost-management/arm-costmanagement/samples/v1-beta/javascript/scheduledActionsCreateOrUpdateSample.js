// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a private scheduled action.
 *
 * @summary create or update a private scheduled action.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-createOrUpdate-private.json
 */
async function createOrUpdatePrivateScheduledAction() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.createOrUpdate(
    "monthlyCostByResource",
    {
      kind: "Email",
      displayName: "Monthly Cost By Resource",
      notification: {
        subject: "Cost by resource this month",
        to: ["user@gmail.com", "team@gmail.com"],
      },
      schedule: {
        daysOfWeek: ["Monday"],
        endDate: new Date("2021-06-19T22:21:51.1287144Z"),
        frequency: "Monthly",
        hourOfDay: 10,
        startDate: new Date("2020-06-19T22:21:51.1287144Z"),
        weeksOfMonth: ["First", "Third"],
      },
      status: "Enabled",
      viewId: "/providers/Microsoft.CostManagement/views/swaggerExample",
    },
    { ifMatch: "" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdatePrivateScheduledAction();
}

main().catch(console.error);
