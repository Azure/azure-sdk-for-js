// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list DbSystemShape resources by SubscriptionLocationResource
 *
 * @summary list DbSystemShape resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-03-01/dbSystemShapes_listByLocation.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function dbSystemShapesListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbSystemShapes.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dbSystemShapesListByLocation();
}

main().catch(console.error);
