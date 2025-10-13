// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get capabilities at specified location in a given subscription.
 *
 * @summary get capabilities at specified location in a given subscription.
 * x-ms-original-file: 2024-12-30/CapabilitiesByLocationList.json
 */
async function capabilitiesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedCapabilities.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await capabilitiesList();
}

main().catch(console.error);
