// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to apply a Config Template to a particular hierarchy node
 *
 * @summary apply a Config Template to a particular hierarchy node
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_LinkToHierarchies_MaximumSet_Gen.json
 */
async function configTemplatesLinkToHierarchiesMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.configTemplates.linkToHierarchies("rgconfigurationmanager", "testname", {
    contextId:
      "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/context/test",
    hierarchyIds: [
      "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/targets/testname",
    ],
    level: "jwfyiatxaecbpounw",
  });
}

async function main() {
  await configTemplatesLinkToHierarchiesMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
