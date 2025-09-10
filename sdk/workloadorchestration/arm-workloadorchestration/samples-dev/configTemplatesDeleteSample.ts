// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Config Template Resource
 *
 * @summary delete a Config Template Resource
 * x-ms-original-file: 2025-06-01/ConfigTemplates_Delete_MaximumSet_Gen.json
 */
async function configTemplatesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.configTemplates.delete("rgconfigurationmanager", "testname");
}

async function main(): Promise<void> {
  await configTemplatesDeleteMaximumSet();
}

main().catch(console.error);
