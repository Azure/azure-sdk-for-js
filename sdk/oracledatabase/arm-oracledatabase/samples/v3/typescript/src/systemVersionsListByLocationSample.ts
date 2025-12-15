// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SystemVersion resources by SubscriptionLocationResource
 *
 * @summary list SystemVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/SystemVersions_ListByLocation_MaximumSet_Gen.json
 */
async function listExadataSystemVersionsByTheProvidedFilterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.systemVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list SystemVersion resources by SubscriptionLocationResource
 *
 * @summary list SystemVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/SystemVersions_ListByLocation_MinimumSet_Gen.json
 */
async function listExadataSystemVersionsByTheProvidedFilterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.systemVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list SystemVersion resources by SubscriptionLocationResource
 *
 * @summary list SystemVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/systemVersions_listByLocation.json
 */
async function systemVersionsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.systemVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExadataSystemVersionsByTheProvidedFilterGeneratedByMaximumSetRule();
  await listExadataSystemVersionsByTheProvidedFilterGeneratedByMinimumSetRule();
  await systemVersionsListByLocation();
}

main().catch(console.error);
