// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a SolutionDeployment Resource
 *
 * @summary update a SolutionDeployment Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionDeployments_Update_MaximumSet_Gen.json
 */
async function solutionDeploymentsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "45FB0C97-8A30-4DA8-81E4-5DFCBED80DBA";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionDeployments.update(
    "rgconfigurationmanager",
    "nhlqmzheqzagkdztldtqj",
    {
      properties: {
        solutionTemplateProperties: {
          subscriptionId: "mqntqdolbjerkxxhieczxkxp",
          resourceGroupName: "gjihxpgiogcnvhgo",
          name: "zzfltgjkeptkaxaobzhao",
          version: "ptsxmabzqnqqlaxbsgubiia",
        },
        input: {},
        targetProperties: { capabilities: ["ruaslqqdcjxbajpkutaxlkhifw"], targetIds: [] },
      },
      tags: { key3704: "qmrxpejzulpussvmbydcanwtvsvc" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionDeploymentsUpdateMaximumSet();
}

main().catch(console.error);
