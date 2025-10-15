// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Project resource.
 *
 * @summary gets a Project resource.
 * x-ms-original-file: 2025-07-01/Projects_Get.json
 */
async function projectsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.projects.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
  );
  console.log(result);
}

async function main() {
  await projectsGet();
}

main().catch(console.error);
