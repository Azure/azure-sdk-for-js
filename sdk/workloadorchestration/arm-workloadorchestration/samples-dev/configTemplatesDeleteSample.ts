// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Config Template Resource
 *
 * @summary delete a Config Template Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_Delete_MaximumSet_Gen.json
 */
async function configTemplatesDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.configTemplates.delete("rgconfigurationmanager", "testname");
}

async function main(): Promise<void> {
  await configTemplatesDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
