// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Context Resource
 *
 * @summary get Context Resource
 * x-ms-original-file: 2025-06-01/Contexts_Get_MaximumSet_Gen.json
 */
async function contextsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.get("rgconfigurationmanager", "testname");
  console.log(result);
}

async function main() {
  await contextsGetMaximumSet();
}

main().catch(console.error);
