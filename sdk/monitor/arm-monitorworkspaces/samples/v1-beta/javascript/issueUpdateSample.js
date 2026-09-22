// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an issue
 *
 * @summary update an issue
 * x-ms-original-file: 2025-10-03/Issue_Update_MaximumSet_Gen.json
 */
async function issueUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.update(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    {
      properties: {
        title: "Alert fired on VM CPU",
        status: "New",
        severity: "Sev2",
        impactTime: new Date("2024-12-13T02:45:33"),
        notifications: {
          updateTypes: [
            { updateType: "IssueCreation" },
            { updateType: "OnChange" },
            { updateType: "TimeBased", updateInterval: "PT1H" },
          ],
          actionGroupIds: [
            "/subscriptions/aceaa046-91f0-492a-96dc-45e10a9183dc/resourceGroups/rg1/providers/Microsoft.Insights/actionGroups/myActionGroup",
          ],
          excludeDefaultActionGroups: false,
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await issueUpdateMaximumSet();
}

main().catch(console.error);
