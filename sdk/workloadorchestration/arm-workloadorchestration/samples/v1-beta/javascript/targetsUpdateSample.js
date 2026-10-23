// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Target Resource
 *
 * @summary update a Target Resource
 * x-ms-original-file: 2026-05-01-preview/Targets_Update_MaximumSet_Gen.json
 */
async function targetsUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.update("rgconfigurationmanager", "testname", {
    properties: {
      displayName: "zkcgsktvpwlsxtnuowajfmu",
      contextId:
        "/subscriptions/612CB927-8AC8-42DD-B74E-C676C3960BA5/resourceGroups/rgconfigurationmanager/providers/Microsoft.Edge/contexts/testContext",
      targetSpecification: {},
      capabilities: ["nbizsvnhtvhposoccvfwaf"],
      hierarchyLevel: "zwsfzqtsyswpbbakmorrzepb",
      solutionScope: "testname",
      state: "active",
      description: "gvtsccujzvogbzzccu",
    },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await targetsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
