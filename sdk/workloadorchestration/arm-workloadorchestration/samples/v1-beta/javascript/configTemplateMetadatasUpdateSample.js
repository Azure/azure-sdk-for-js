// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ConfigTemplateMetadata Resource
 *
 * @summary update a ConfigTemplateMetadata Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateMetadatas_Update_MaximumSet_Gen.json
 */
async function configTemplateMetadatasUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplateMetadatas.update(
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
            level: "uwljjosdlhmyalhrvq",
          },
        ],
        unLinkedHierarchies: [
          {
            hierarchyIds: [
              "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testname",
            ],
            level: "zuwwzwpeur",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await configTemplateMetadatasUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
