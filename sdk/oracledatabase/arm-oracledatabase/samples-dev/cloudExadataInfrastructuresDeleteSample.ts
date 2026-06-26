// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CloudExadataInfrastructure
 *
 * @summary delete a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Delete_MaximumSet_Gen.json
 */
async function deleteExadataInfrastructureGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudExadataInfrastructures.delete(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  );
}

/**
 * This sample demonstrates how to delete a CloudExadataInfrastructure
 *
 * @summary delete a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Delete_MinimumSet_Gen.json
 */
async function deleteExadataInfrastructureGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudExadataInfrastructures.delete(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  );
}

/**
 * This sample demonstrates how to delete a CloudExadataInfrastructure
 *
 * @summary delete a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/exaInfra_delete.json
 */
async function cloudExadataInfrastructuresDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudExadataInfrastructures.delete("rg000", "infra1");
}

async function main(): Promise<void> {
  await deleteExadataInfrastructureGeneratedByMaximumSetRule();
  await deleteExadataInfrastructureGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresDelete();
}

main().catch(console.error);
