// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by specified resource group
 *
 * @summary list by specified resource group
 * x-ms-original-file: 2026-05-01-preview/SchemaVersions_ListBySchema_MaximumSet_Gen.json
 */
async function schemaVersionsListBySchemaMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaVersions.listBySchema(
    "rgconfigurationmanager",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schemaVersionsListBySchemaMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
