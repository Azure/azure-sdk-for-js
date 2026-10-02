// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Solution Template Version Resource
 *
 * @summary update a Solution Template Version Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionTemplateVersions_Update_MaximumSet_Gen.json
 */
async function solutionTemplateVersionsUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionTemplateVersions.update(
    "rgconfigurationmanager",
    "testname",
    "1.0.0",
    {
      properties: {
        configurations: "pwehvxzltujmytianbjsqgmcj",
        specification: {},
        orchestratorType: "TO",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionTemplateVersionsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
