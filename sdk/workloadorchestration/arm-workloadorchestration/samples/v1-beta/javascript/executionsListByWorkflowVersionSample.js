// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Execution Resources
 *
 * @summary list Execution Resources
 * x-ms-original-file: 2026-05-01-preview/Executions_ListByWorkflowVersion_MaximumSet_Gen.json
 */
async function executionsListByWorkflowVersionMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.executions.listByWorkflowVersion(
    "rgconfigurationmanager",
    "testname",
    "testname",
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
