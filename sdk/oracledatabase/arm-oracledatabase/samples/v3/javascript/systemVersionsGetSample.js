// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SystemVersion
 *
 * @summary get a SystemVersion
 * x-ms-original-file: 2025-09-01/SystemVersions_Get_MaximumSet_Gen.json
 */
async function getExadataSystemVersionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.systemVersions.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a SystemVersion
 *
 * @summary get a SystemVersion
 * x-ms-original-file: 2025-09-01/SystemVersions_Get_MinimumSet_Gen.json
 */
async function getExadataSystemVersionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.systemVersions.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a SystemVersion
 *
 * @summary get a SystemVersion
 * x-ms-original-file: 2025-09-01/systemVersions_get.json
 */
async function systemVersionsListSystemVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.systemVersions.get("eastus", "22.x");
  console.log(result);
}

async function main() {
  await getExadataSystemVersionGeneratedByMaximumSetRule();
  await getExadataSystemVersionGeneratedByMinimumSetRule();
  await systemVersionsListSystemVersions();
}

main().catch(console.error);
