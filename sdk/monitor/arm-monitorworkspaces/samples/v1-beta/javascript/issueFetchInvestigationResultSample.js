// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch investigation result
 *
 * @summary fetch investigation result
 * x-ms-original-file: 2025-10-03/Issue_FetchInvestigationResult_MaximumSet_Gen.json
 */
async function issueFetchInvestigationResultMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.fetchInvestigationResult(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    { investigationId: "b7341c85-b2c7-46ea-9a7f-784823b71fbc" },
  );
  console.log(result);
}

async function main() {
  await issueFetchInvestigationResultMaximumSet();
}

main().catch(console.error);
