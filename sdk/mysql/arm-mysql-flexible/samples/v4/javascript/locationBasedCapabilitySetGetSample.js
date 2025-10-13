// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get capabilities at specified location in a given subscription.
 *
 * @summary get capabilities at specified location in a given subscription.
 * x-ms-original-file: 2024-12-30/CapabilitySetByLocation.json
 */
async function capabilityResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.locationBasedCapabilitySet.get("WestUS", "default");
  console.log(result);
}

async function main() {
  await capabilityResult();
}

main().catch(console.error);
