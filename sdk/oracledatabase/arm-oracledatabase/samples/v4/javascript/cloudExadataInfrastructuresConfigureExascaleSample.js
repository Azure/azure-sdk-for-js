// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures Exascale on Cloud exadata infrastructure resource
 *
 * @summary configures Exascale on Cloud exadata infrastructure resource
 * x-ms-original-file: 2026-06-01/CloudExadataInfrastructures_ConfigureExascale_MaximumSet_Gen.json
 */
async function cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.configureExascale(
    "rgopenapi",
    "resource1",
    { totalStorageInGbs: 14 },
  );
  console.log(result);
}

async function main() {
  await cloudExadataInfrastructuresConfigureExascaleMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
