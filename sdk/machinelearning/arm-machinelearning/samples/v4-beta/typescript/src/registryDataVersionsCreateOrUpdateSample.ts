// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Registry/DataVersionBase/createOrUpdate.json
 */
async function createOrUpdateRegistryDataVersionBase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryDataVersions.createOrUpdate(
    "test-rg",
    "registryName",
    "string",
    "string",
    {
      properties: {
        description: "string",
        dataType: "mltable",
        dataUri: "string",
        isAnonymous: false,
        isArchived: false,
        properties: { string: "string" },
        referencedUris: ["string"],
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryDataVersionBase();
}

main().catch(console.error);
