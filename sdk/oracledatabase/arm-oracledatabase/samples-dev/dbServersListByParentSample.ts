// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbServer resources by CloudExadataInfrastructure
 *
 * @summary list DbServer resources by CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/DbServers_ListByParent_MaximumSet_Gen.json
 */
async function listDbServersByExadataInfrastructureGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbServers.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DbServer resources by CloudExadataInfrastructure
 *
 * @summary list DbServer resources by CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/DbServers_ListByParent_MinimumSet_Gen.json
 */
async function listDbServersByExadataInfrastructureGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbServers.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDbServersByExadataInfrastructureGeneratedByMaximumSetRule();
  await listDbServersByExadataInfrastructureGeneratedByMinimumSetRule();
}

main().catch(console.error);
