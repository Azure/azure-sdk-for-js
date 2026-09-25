// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Hierarchy Configuration Metadata Version resources
 *
 * @summary list Hierarchy Configuration Metadata Version resources
 * x-ms-original-file: 2026-05-01-preview/HierarchyConfigurationMetadataVersions_ListByParent_MaximumSet_Gen.json
 */
async function hierarchyConfigurationMetadataVersionsListByParentMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WorkloadOrchestrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.hierarchyConfigurationMetadataVersions.listByParent(
    "subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testTarget",
    "ct101",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await hierarchyConfigurationMetadataVersionsListByParentMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
