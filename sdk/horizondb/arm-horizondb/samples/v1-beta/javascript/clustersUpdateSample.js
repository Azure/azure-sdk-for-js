// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing HorizonDB cluster.
 *
 * @summary updates an existing HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/Clusters_Update.json
 */
async function updateAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.update("example-resource-group", "example-cluster", {
    tags: { environment: "production", team: "data-platform" },
    properties: { network: { publicAccess: "Disabled" }, backup: { retentionDays: 21 } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing HorizonDB cluster.
 *
 * @summary updates an existing HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/Clusters_UpdateDataEncryption.json
 */
async function rotateTheCustomerManagedKeyUsedByAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.update("example-resource-group", "example-cluster", {
    properties: {
      dataEncryption: {
        primaryKeyUri: "https://primary-key-vault.vault.azure.net/keys/horizondb-primary-key",
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateAHorizonDBCluster();
  await rotateTheCustomerManagedKeyUsedByAHorizonDBCluster();
}

main().catch(console.error);
