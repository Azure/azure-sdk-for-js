// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Job Definitions in a Project.
 *
 * @summary lists all Job Definitions in a Project.
 * x-ms-original-file: 2025-07-01/JobDefinitions_List.json
 */
async function jobDefinitionsList(): Promise<void> {
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

async function main(): Promise<void> {
  await jobDefinitionsList();
}

main().catch(console.error);
