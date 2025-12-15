// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GiVersion
 *
 * @summary get a GiVersion
 * x-ms-original-file: 2025-09-01/GiVersions_Get_MaximumSet_Gen.json
 */
async function getAGiVersionByNameGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.giVersions.get("eastus", "giversion1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a GiVersion
 *
 * @summary get a GiVersion
 * x-ms-original-file: 2025-09-01/GiVersions_Get_MinimumSet_Gen.json
 */
async function getAGiVersionByNameGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.giVersions.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a GiVersion
 *
 * @summary get a GiVersion
 * x-ms-original-file: 2025-09-01/giVersions_get.json
 */
async function giVersionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.giVersions.get("eastus", "19.0.0.0");
  console.log(result);
}

async function main() {
  await getAGiVersionByNameGeneratedByMaximumSetRule();
  await getAGiVersionByNameGeneratedByMinimumSetRule();
  await giVersionsGet();
}

main().catch(console.error);
