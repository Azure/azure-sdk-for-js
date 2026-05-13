// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoraccounts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch the background visualization of the issue
 *
 * @summary fetch the background visualization of the issue
 * x-ms-original-file: 2025-10-03/Issue_FetchBackgroundVisualization_MaximumSet_Gen.json
 */
async function issueFetchBackgroundVisualizationMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.fetchBackgroundVisualization(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
  );
  console.log(result);
}

async function main() {
  await issueFetchBackgroundVisualizationMaximumSet();
}

main().catch(console.error);
