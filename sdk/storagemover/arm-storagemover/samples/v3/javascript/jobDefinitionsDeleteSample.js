// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Job Definition resource.
 *
 * @summary deletes a Job Definition resource.
 * x-ms-original-file: 2025-07-01/JobDefinitions_Delete.json
 */
async function projectsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.jobDefinitions.delete(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
  );
}

async function main() {
  await projectsDelete();
}

main().catch(console.error);
