// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Project resource, which is a logical grouping of related jobs.
 *
 * @summary creates or updates a Project resource, which is a logical grouping of related jobs.
 * x-ms-original-file: 2025-07-01/Projects_CreateOrUpdate.json
 */
async function projectsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    { properties: { description: "Example Project Description" } },
  );
  console.log(result);
}

async function main() {
  await projectsCreateOrUpdate();
}

main().catch(console.error);
