// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update cluster secrets locations.
 *
 * @summary update cluster secrets locations.
 * x-ms-original-file: 2025-12-01-preview/Clusters_UpdateSecretsLocations.json
 */
async function updateSecretsLocationsForACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.updateSecretsLocations("test-rg", "myCluster", {
    properties: [
      { secretsLocation: "https://kvname.vault.azure.net/", secretsType: "BackupSecrets" },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateSecretsLocationsForACluster();
}

main().catch(console.error);
