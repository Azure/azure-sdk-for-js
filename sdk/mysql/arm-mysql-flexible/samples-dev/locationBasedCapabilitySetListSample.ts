// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get capabilities at specified location in a given subscription.
 *
 * @summary Get capabilities at specified location in a given subscription.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/stable/2023-12-30/examples/CapabilitySetListByLocation.json
 */
async function capabilitySetsResult(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "WestUS";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedCapabilitySet.list(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await capabilitySetsResult();
}

main().catch(console.error);
