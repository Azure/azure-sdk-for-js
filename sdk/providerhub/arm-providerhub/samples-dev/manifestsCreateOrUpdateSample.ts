// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a manifest in manifest repository.
 *
 * @summary creates or Updates a manifest in manifest repository.
 * x-ms-original-file: 2025-10-01/Manifests_CreateOrUpdate.json
 */
async function manifestsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.manifests.createOrUpdate("Microsoft.Contoso", "prod", {
    properties: { manifest: "<<Core RP manifest>>" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await manifestsCreateOrUpdate();
}

main().catch(console.error);
