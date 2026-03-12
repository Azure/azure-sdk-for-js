// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @summary Get the recommended SAP Availability Zone Pair Details for your region.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPAvailabilityZoneDetails_eastus.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sapAvailabilityZoneDetailsEastus(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const location = "centralus";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPAvailabilityZoneDetails(location);
  console.log(result);
}

/**
 * This sample demonstrates how to Get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @summary Get the recommended SAP Availability Zone Pair Details for your region.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPAvailabilityZoneDetails_northeurope.json
 */
async function sapAvailabilityZoneDetailsNortheurope(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const location = "centralus";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPAvailabilityZoneDetails(location);
  console.log(result);
}

async function main(): Promise<void> {
  await sapAvailabilityZoneDetailsEastus();
  await sapAvailabilityZoneDetailsNortheurope();
}

main().catch(console.error);
