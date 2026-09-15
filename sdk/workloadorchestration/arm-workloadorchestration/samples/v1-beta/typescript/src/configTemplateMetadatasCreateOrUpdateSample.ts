// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a ConfigTemplateMetadata Resource
 *
 * @summary create or update a ConfigTemplateMetadata Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateMetadatas_CreateOrUpdate_MaximumSet_Gen.json
 */
async function configTemplateMetadatasCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplateMetadatas.createOrUpdate(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
    {
      properties: {
        contextId:
          "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/contexts/testContext",
        linkedHierarchies: [
          {
            hierarchyIds: [
              "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testname",
            ],
            level: "shrxop",
          },
        ],
        unLinkedHierarchies: [
          {
            hierarchyIds: [
              "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testname",
            ],
            level: "shrxop",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplateMetadatasCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
