// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoraccounts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an issue
 *
 * @summary delete an issue
 * x-ms-original-file: 2025-10-03/Issue_Delete_MaximumSet_Gen.json
 */
async function issueDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  await client.issue.delete("rg1", "myWorkspace", "3f29e1b2b05f8371595dc761fed8e8b3");
}

async function main() {
  await issueDeleteMaximumSet();
}

main().catch(console.error);
