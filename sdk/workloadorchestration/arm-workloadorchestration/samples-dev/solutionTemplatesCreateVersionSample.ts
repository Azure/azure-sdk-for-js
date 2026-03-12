// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Solution Template Version Resource
 *
 * @summary create a Solution Template Version Resource
 * x-ms-original-file: 2025-06-01/SolutionTemplates_CreateVersion_MaximumSet_Gen.json
 */
async function solutionTemplatesCreateVersionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionTemplates.createVersion(
    "rgconfigurationmanager",
    "testname",
    {
      updateType: "Major",
      version: "1.0.0",
      solutionTemplateVersion: {
        properties: {
          configurations: "ofqcsavwmeuwmvtjnqpoybtjvkmrlh",
          specification: {},
          orchestratorType: "TO",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionTemplatesCreateVersionMaximumSet();
}

main().catch(console.error);
