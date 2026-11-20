// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove Config Template Version Resource
 *
 * @summary remove Config Template Version Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_RemoveVersion_MaximumSet_Gen.json
 */
async function configTemplatesRemoveVersionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.removeVersion("rgconfigurationmanager", "testname", {
    version: "nipqereqmxeiv",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplatesRemoveVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
