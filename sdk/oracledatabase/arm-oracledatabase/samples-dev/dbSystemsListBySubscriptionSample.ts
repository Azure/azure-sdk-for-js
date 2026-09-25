// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbSystem resources by subscription ID
 *
 * @summary list DbSystem resources by subscription ID
 * x-ms-original-file: 2026-06-01/DbSystems_ListBySubscription_MaximumSet_Gen.json
 */
async function dbSystemsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbSystems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dbSystemsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
