// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Config Template Resource
 *
 * @summary update a Config Template Resource
 * x-ms-original-file: 2025-06-01/ConfigTemplates_Update_MaximumSet_Gen.json
 */
async function configTemplatesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.update("rgconfigurationmanager", "testname", {
    properties: { description: "cavjiqnrbzsvedicrixhwnfj" },
    tags: { key7701: "wrsv" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplatesUpdateMaximumSet();
}

main().catch(console.error);
