// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Timeseries for a given Experiment
 *
 * @summary Gets a Timeseries for a given Experiment
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentGetTimeseries.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsATimeseriesForAGivenExperiment(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const profileName = "MyProfile";
  const experimentName = "MyExperiment";
  const startDateTimeUTC = new Date("2019-07-21T17:32:28Z");
  const endDateTimeUTC = new Date("2019-09-21T17:32:28Z");
  const aggregationInterval = "Hourly";
  const timeseriesType = "MeasurementCounts";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.reports.getTimeseries(
    resourceGroupName,
    profileName,
    experimentName,
    startDateTimeUTC,
    endDateTimeUTC,
    aggregationInterval,
    timeseriesType,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsATimeseriesForAGivenExperiment();
}

main().catch(console.error);
