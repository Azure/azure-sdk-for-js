// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upon receiving approval or rejection from approver, this facilitates actions on approval resource
 *
 * @summary upon receiving approval or rejection from approver, this facilitates actions on approval resource
 * x-ms-original-file: 2025-05-01-preview/Approvals_NotifyInitiator.json
 */
async function approvalNotifyInitiator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.approval.notifyInitiator(
    "subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/enclaveconnections/TestMyEnclaveConnection",
    "TestApprovals",
    { approvalStatus: "Approved" },
  );
  console.log(result);
}

async function main() {
  await approvalNotifyInitiator();
}

main().catch(console.error);
