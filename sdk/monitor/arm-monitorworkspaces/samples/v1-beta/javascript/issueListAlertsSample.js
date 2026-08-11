// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all alerts in the issue - this method uses pagination to return all alerts
 *
 * @summary list all alerts in the issue - this method uses pagination to return all alerts
 * x-ms-original-file: 2025-10-03/Issue_ListAlerts_MaximumSet_Gen.json
 */
async function issueListAlertsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.listAlerts(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    { filter: "" },
  );
  console.log(result);
}

async function main() {
  await issueListAlertsMaximumSet();
}

main().catch(console.error);
