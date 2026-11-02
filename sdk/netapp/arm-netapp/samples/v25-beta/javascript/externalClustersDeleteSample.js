// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified External Cluster
 *
 * @summary delete the specified External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_Delete.json
 */
async function externalClustersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalClusters.delete("contosoNetAppRg", "contoso-external-cluster");
}

async function main() {
  await externalClustersDelete();
}

main().catch(console.error);
