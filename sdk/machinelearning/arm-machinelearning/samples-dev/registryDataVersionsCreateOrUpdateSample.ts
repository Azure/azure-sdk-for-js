// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update version.
 *
 * @summary Create or update version.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/DataVersionBase/createOrUpdate.json
 */

import type { DataVersionBase } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateRegistryDataVersionBase(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "registryName";
  const name = "string";
  const version = "string";
  const body: DataVersionBase = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryDataVersions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    registryName,
    name,
    version,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryDataVersionBase();
}

main().catch(console.error);
