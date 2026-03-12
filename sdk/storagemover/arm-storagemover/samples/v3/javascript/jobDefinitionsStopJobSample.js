// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to requests the Agent of any active instance of this Job Definition to stop.
 *
 * @summary requests the Agent of any active instance of this Job Definition to stop.
 * x-ms-original-file: 2025-07-01/JobDefinitions_StopJob.json
 */
async function jobDefinitionsStopJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.stopJob(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
  );
  console.log(result);
}

async function main() {
  await jobDefinitionsStopJob();
}

main().catch(console.error);
