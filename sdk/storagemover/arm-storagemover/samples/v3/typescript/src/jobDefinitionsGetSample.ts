// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Job Definition resource.
 *
 * @summary gets a Job Definition resource.
 * x-ms-original-file: 2025-07-01/JobDefinitions_Get.json
 */
async function jobDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobDefinitionsGet();
}

main().catch(console.error);
