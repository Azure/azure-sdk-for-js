// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Schema Resource
 *
 * @summary delete a Schema Resource
 * x-ms-original-file: 2025-06-01/Schemas_Delete_MaximumSet_Gen.json
 */
async function schemasDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.schemas.delete("rgconfigurationmanager", "testname");
}

async function main() {
  await schemasDeleteMaximumSet();
}

main().catch(console.error);
