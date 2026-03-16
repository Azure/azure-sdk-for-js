// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Timeseries for a given Experiment
 *
 * @summary gets a Timeseries for a given Experiment
 * x-ms-original-file: 2025-10-01/NetworkExperimentGetTimeseries.json
 */
async function getsATimeseriesForAGivenExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.reports.getTimeseries(
    "MyResourceGroup",
    "MyProfile",
    "MyExperiment",
    new Date("2019-07-21T17:32:28Z"),
    new Date("2019-09-21T17:32:28Z"),
    "Hourly",
    "MeasurementCounts",
  );
  console.log(result);
}

async function main() {
  await getsATimeseriesForAGivenExperiment();
}

main().catch(console.error);
