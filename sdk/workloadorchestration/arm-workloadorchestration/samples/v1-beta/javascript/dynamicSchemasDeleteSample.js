// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DynamicSchema Resource
 *
 * @summary delete a DynamicSchema Resource
 * x-ms-original-file: 2025-06-01/DynamicSchemas_Delete_MaximumSet_Gen.json
 */
async function dynamicSchemasDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.dynamicSchemas.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await dynamicSchemasDeleteMaximumSet();
}

main().catch(console.error);
