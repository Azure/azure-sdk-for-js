// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ModelSource
 *
 * @summary delete a ModelSource
 * x-ms-original-file: 2026-05-02-preview/ModelSources_Delete.json
 */
async function modelSourcesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.modelSources.delete("rgaimanagers", "aimanager1", "huggingface", {
    ifMatch: '"abc123def456"',
  });
}

async function main() {
  await modelSourcesDeleteMaximumSet();
}

main().catch(console.error);
