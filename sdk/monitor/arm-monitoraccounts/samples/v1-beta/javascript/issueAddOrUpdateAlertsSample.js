// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoraccounts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add or update alerts in the issue
 *
 * @summary add or update alerts in the issue
 * x-ms-original-file: 2025-10-03/Issue_AddOrUpdateAlerts_MaximumSet_Gen.json
 */
async function issueAddOrUpdateAlertsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.addOrUpdateAlerts(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    {
      value: [
        {
          id: "/subscriptions/aceaa046-91f0-492a-96dc-45e10a9183dc/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1/Microsoft.AlertsManagement/2ca4a194-dd28-4d38-92ca-df48f6a3efc3",
          relevance: "Relevant",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await issueAddOrUpdateAlertsMaximumSet();
}

main().catch(console.error);
