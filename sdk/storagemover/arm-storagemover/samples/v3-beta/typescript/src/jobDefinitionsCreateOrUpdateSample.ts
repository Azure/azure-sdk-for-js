// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @summary creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 * x-ms-original-file: 2024-07-01/JobDefinitions_CreateOrUpdate.json
 */
async function jobDefinitionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
    {
      properties: {
        description: "Example Job Definition Description",
        agentName: "migration-agent",
        copyMode: "Additive",
        sourceName: "examples-sourceEndpointName",
        sourceSubpath: "/",
        targetName: "examples-targetEndpointName",
        targetSubpath: "/",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobDefinitionsCreateOrUpdate();
}

main().catch(console.error);
