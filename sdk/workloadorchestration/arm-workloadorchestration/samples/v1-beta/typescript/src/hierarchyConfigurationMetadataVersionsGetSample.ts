// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Hierarchy Configuration Metadata Version resource
 *
 * @summary get a Hierarchy Configuration Metadata Version resource
 * x-ms-original-file: 2026-05-01-preview/HierarchyConfigurationMetadataVersions_Get_MaximumSet_Gen.json
 */
async function hierarchyConfigurationMetadataVersionsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const result = await client.hierarchyConfigurationMetadataVersions.get(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "ct101",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hierarchyConfigurationMetadataVersionsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
