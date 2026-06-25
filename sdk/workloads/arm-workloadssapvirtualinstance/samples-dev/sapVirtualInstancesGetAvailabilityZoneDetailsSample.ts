// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @summary get the recommended SAP Availability Zone Pair Details for your region.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeAvailabilityZoneDetails_eastus.json
 */
async function sapAvailabilityZoneDetailsInEastUs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getAvailabilityZoneDetails("eastus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    databaseType: "HANA",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @summary get the recommended SAP Availability Zone Pair Details for your region.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeAvailabilityZoneDetails_northeurope.json
 */
async function sapAvailabilityZoneDetailsInNorthEurope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getAvailabilityZoneDetails("northeurope", {
    appLocation: "northeurope",
    sapProduct: "S4HANA",
    databaseType: "HANA",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sapAvailabilityZoneDetailsInEastUs();
  await sapAvailabilityZoneDetailsInNorthEurope();
}

main().catch(console.error);
