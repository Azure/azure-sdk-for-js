// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all existing time series database connections for this DigitalTwins instance.
 *
 * @summary Get all existing time series database connections for this DigitalTwins instance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/TimeSeriesDatabaseConnectionsList_example.json
 */
async function listTimeSeriesDatabaseConnectionsForADigitalTwinsInstance(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.timeSeriesDatabaseConnections.list(
    resourceGroupName,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listTimeSeriesDatabaseConnectionsForADigitalTwinsInstance();
}

main().catch(console.error);
