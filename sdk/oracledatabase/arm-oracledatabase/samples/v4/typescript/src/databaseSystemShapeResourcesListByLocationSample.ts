// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DatabaseSystemShape resources by SubscriptionLocationResource
 *
 * @summary list DatabaseSystemShape resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-06-01/DatabaseSystemShapeResources_ListByLocation_MaximumSet_Gen.json
 */
async function databaseSystemShapeResourcesListByLocationMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseSystemShapeResources.listByLocation("eastus", {
    shapeAttribute: "example",
    zone: "bxkklcsc",
    availabilityDomain: "njeq",
    databaseShapeFamily: "example",
    databaseEdition: "example",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await databaseSystemShapeResourcesListByLocationMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
