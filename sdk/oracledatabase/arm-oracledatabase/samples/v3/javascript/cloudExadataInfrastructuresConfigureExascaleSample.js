// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures Exascale on Cloud exadata infrastructure resource
 *
 * @summary configures Exascale on Cloud exadata infrastructure resource
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ConfigureExascale_MaximumSet_Gen.json
 */
async function cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.configureExascale(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    { totalStorageInGbs: 19 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to configures Exascale on Cloud exadata infrastructure resource
 *
 * @summary configures Exascale on Cloud exadata infrastructure resource
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ConfigureExascale_MinimumSet_Gen.json
 */
async function cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.configureExascale(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    { totalStorageInGbs: 19 },
  );
  console.log(result);
}

async function main() {
  await cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMaximumSetRule();
  await cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
