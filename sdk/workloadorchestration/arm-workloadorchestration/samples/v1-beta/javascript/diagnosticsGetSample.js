// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of specified Diagnostic resource.
 *
 * @summary returns details of specified Diagnostic resource.
 * x-ms-original-file: 2025-06-01/Diagnostics_Get_MaximumSet_Gen.json
 */
async function diagnosticsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.get("rgconfigurationmanager", "testname");
  console.log(result);
}

async function main() {
  await diagnosticsGetMaximumSet();
}

main().catch(console.error);
