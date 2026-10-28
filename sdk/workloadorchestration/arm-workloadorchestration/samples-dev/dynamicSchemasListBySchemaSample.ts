// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by Schema
 *
 * @summary list by Schema
 * x-ms-original-file: 2026-05-01-preview/DynamicSchemas_ListBySchema_MaximumSet_Gen.json
 */
async function dynamicSchemasListBySchemaMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
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
  await dynamicSchemasListBySchemaMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
