// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a SolutionDeployment Resource
 *
 * @summary create or update a SolutionDeployment Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionDeployments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function solutionDeploymentsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "45FB0C97-8A30-4DA8-81E4-5DFCBED80DBA";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionDeployments.createOrUpdate(
    "rgconfigurationmanager",
    "nhlqmzheqzagkdztldtqj",
    {
      properties: {
        solutionTemplateProperties: {
          subscriptionId: "drkshbgxfn",
          resourceGroupName: "buqhpshsfrejqxsuurhwaim",
          name: "tbldbhhnetgrzp",
          version: "bamks",
        },
        input: {},
        targetProperties: { capabilities: ["ruaslqqdcjxbajpkutaxlkhifw"], targetIds: [] },
      },
      tags: { key3698: "udidcwksblfqmkdumfx" },
      location: "igudkwioxbauvezpqnxfpzihalxw",
    },
  );
  console.log(result);
}

async function main() {
  await solutionDeploymentsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
