// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by Schema
 *
 * @summary list by Schema
 * x-ms-original-file: 2025-06-01/DynamicSchemas_ListBySchema_MaximumSet_Gen.json
 */
async function dynamicSchemasListBySchemaMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dynamicSchemas.listBySchema(
    "rgconfigurationmanager",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dynamicSchemasListBySchemaMaximumSet();
}

main().catch(console.error);
