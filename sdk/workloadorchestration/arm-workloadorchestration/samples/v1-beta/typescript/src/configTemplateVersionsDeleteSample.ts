// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Config Template Version Resource
 *
 * @summary delete a Config Template Version Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateVersions_Delete_MaximumSet_Gen.json
 */
async function configTemplateVersionsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.configTemplateVersions.delete("rgconfigurationmanager", "testname", "1.0.0");
}

async function main(): Promise<void> {
  await configTemplateVersionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
