// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CloudExadataInfrastructure
 *
 * @summary get a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Get_MaximumSet_Gen.json
 */
async function getExadataInfrastructureGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a CloudExadataInfrastructure
 *
 * @summary get a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Get_MinimumSet_Gen.json
 */
async function getExadataInfrastructureGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a CloudExadataInfrastructure
 *
 * @summary get a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/exaInfra_get.json
 */
async function cloudExadataInfrastructuresGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.get("rg000", "infra1");
  console.log(result);
}

async function main() {
  await getExadataInfrastructureGeneratedByMaximumSetRule();
  await getExadataInfrastructureGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresGet();
}

main().catch(console.error);
