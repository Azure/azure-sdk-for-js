// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GiVersion resources by SubscriptionLocationResource
 *
 * @summary list GiVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-06-01/GiVersions_ListByLocation_MaximumSet_Gen.json
 */
async function giVersionsListByLocationMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.giVersions.listByLocation("eastus", {
    shape: "Exadata.X9M",
    zone: "example",
    shapeAttribute: "bmr",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await giVersionsListByLocationMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
