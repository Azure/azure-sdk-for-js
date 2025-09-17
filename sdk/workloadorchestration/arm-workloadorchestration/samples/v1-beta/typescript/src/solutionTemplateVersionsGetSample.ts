// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Solution Template Version Resource
 *
 * @summary get a Solution Template Version Resource
 * x-ms-original-file: 2025-06-01/SolutionTemplateVersions_Get_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionTemplateVersions.get(
    "rgconfigurationmanager",
    "testname",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionTemplateVersionsGetMaximumSet();
}

main().catch(console.error);
