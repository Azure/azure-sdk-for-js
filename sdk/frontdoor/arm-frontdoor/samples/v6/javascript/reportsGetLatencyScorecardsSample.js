// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Latency Scorecard for a given Experiment
 *
 * @summary gets a Latency Scorecard for a given Experiment
 * x-ms-original-file: 2025-10-01/NetworkExperimentGetLatencyScorecard.json
 */
async function getsALatencyScorecardForAGivenExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.reports.getLatencyScorecards(
    "MyResourceGroup",
    "MyProfile",
    "MyExperiment",
    "Daily",
  );
  console.log(result);
}

async function main() {
  await getsALatencyScorecardForAGivenExperiment();
}

main().catch(console.error);
