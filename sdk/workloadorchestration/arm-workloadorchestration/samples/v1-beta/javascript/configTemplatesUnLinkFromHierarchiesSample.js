// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove a Config Template from a particular hierarchy node
 *
 * @summary remove a Config Template from a particular hierarchy node
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_UnLinkFromHierarchies_MaximumSet_Gen.json
 */
async function configTemplatesUnLinkFromHierarchiesMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.configTemplates.unLinkFromHierarchies("rgconfigurationmanager", "testname", {
    contextId:
      "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/context/test",
    hierarchyIds: [
      "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testname",
    ],
    level: "jwfyiatxaecbpounw",
  });
}

async function main() {
  await configTemplatesUnLinkFromHierarchiesMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
