// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Timeseries for a given Experiment
 *
 * @summary gets a Timeseries for a given Experiment
 * x-ms-original-file: 2025-11-01/NetworkExperimentGetTimeseries.json
 */
async function getsATimeseriesForAGivenExperiment(): Promise<void> {
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

async function main(): Promise<void> {
  await getsATimeseriesForAGivenExperiment();
}

main().catch(console.error);
