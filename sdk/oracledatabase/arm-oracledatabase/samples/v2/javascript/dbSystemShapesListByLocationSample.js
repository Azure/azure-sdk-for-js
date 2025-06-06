// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DbSystemShape resources by SubscriptionLocationResource
 *
 * @summary list DbSystemShape resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-03-01/dbSystemShapes_listByLocation.json
 */
async function dbSystemShapesListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbSystemShapes.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dbSystemShapesListByLocation();
}

main().catch(console.error);
