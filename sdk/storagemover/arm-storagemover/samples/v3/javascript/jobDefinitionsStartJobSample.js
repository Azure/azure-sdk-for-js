// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution.
 *
 * @summary creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution.
 * x-ms-original-file: 2025-07-01/JobDefinitions_StartJob.json
 */
async function jobDefinitionsStartJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.startJob(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
  );
  console.log(result);
}

async function main() {
  await jobDefinitionsStartJob();
}

main().catch(console.error);
