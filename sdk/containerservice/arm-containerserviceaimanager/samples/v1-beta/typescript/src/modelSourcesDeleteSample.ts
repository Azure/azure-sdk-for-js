// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ModelSource
 *
 * @summary delete a ModelSource
 * x-ms-original-file: 2026-05-02-preview/ModelSources_Delete.json
 */
async function modelSourcesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.modelSources.delete("rgaimanagers", "aimanager1", "huggingface", {
    ifMatch: '"abc123def456"',
  });
}

async function main(): Promise<void> {
  await modelSourcesDeleteMaximumSet();
}

main().catch(console.error);
