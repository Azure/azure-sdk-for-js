// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Solution Template Resource
 *
 * @summary create or update a Solution Template Resource
 * x-ms-original-file: 2025-06-01/SolutionTemplates_CreateOrUpdate_MaximumSet_Gen.json
 */
async function solutionTemplatesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionTemplates.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    {
      properties: {
        description: "psrftehgzngcdlccivhjmwsmiz",
        capabilities: ["dfoyxbbknrhvlunhmuyyt"],
        state: "active",
        enableExternalValidation: true,
      },
      tags: { key5091: "dov" },
      location: "zheaaqvadewftnctxzpinrgeproqs",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionTemplatesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
