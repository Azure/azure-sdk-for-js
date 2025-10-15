// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Schema Version Resource
 *
 * @summary get a Schema Version Resource
 * x-ms-original-file: 2025-06-01/SchemaVersions_Get_MaximumSet_Gen.json
 */
async function schemaVersionsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemaVersions.get("rgconfigurationmanager", "testname", "1.0.0");
  console.log(result);
}

async function main() {
  await schemaVersionsGetMaximumSet();
}

main().catch(console.error);
