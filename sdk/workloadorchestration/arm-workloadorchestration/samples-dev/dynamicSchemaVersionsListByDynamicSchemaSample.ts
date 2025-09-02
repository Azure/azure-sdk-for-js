// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by Dynamic Schema
 *
 * @summary list by Dynamic Schema
 * x-ms-original-file: 2025-06-01/DynamicSchemaVersions_ListByDynamicSchema_MaximumSet_Gen.json
 */
async function dynamicSchemaVersionsListByDynamicSchemaMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dynamicSchemaVersions.listByDynamicSchema(
    "rgconfigurationmanager",
    "testname",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dynamicSchemaVersionsListByDynamicSchemaMaximumSet();
}

main().catch(console.error);
