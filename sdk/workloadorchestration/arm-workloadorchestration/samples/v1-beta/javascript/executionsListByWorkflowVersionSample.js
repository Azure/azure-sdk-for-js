// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Execution Resources
 *
 * @summary list Execution Resources
 * x-ms-original-file: 2025-06-01/Executions_ListByWorkflowVersion_MaximumSet_Gen.json
 */
async function executionsListByWorkflowVersionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE6D9590-0D52-4B1C-935C-FE49DBF838EB";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.executions.listByWorkflowVersion(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
    "abcde",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await executionsListByWorkflowVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
