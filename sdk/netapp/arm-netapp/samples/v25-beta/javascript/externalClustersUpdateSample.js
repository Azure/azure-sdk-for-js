// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified External Cluster
 *
 * @summary patch the specified External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_Update.json
 */
async function externalClustersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalClusters.update(
    "contosoNetAppRg",
    "contoso-external-cluster",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await externalClustersUpdate();
}

main().catch(console.error);
