// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates properties for a Project resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for a Project resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Projects_Update.json
 */
async function projectsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.projects.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    { properties: { description: "Example Project Description" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectsUpdate();
}

main().catch(console.error);
