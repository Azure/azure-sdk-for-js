// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Job Definitions in a Project.
 *
 * @summary lists all Job Definitions in a Project.
 * x-ms-original-file: 2025-07-01/JobDefinitions_List.json
 */
async function jobDefinitionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobDefinitions.list(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await jobDefinitionsList();
}

main().catch(console.error);
