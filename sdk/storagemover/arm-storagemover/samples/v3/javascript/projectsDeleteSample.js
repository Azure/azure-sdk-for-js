// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Project resource.
 *
 * @summary deletes a Project resource.
 * x-ms-original-file: 2025-07-01/Projects_Delete.json
 */
async function projectsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.projects.delete("examples-rg", "examples-storageMoverName", "examples-projectName");
}

async function main() {
  await projectsDelete();
}

main().catch(console.error);
