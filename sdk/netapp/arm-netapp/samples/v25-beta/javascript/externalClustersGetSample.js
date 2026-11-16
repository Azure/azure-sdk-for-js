// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the External Cluster
 *
 * @summary get the External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_Get.json
 */
async function externalClustersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalClusters.get("contosoNetAppRg", "contoso-external-cluster");
  console.log(result);
}

async function main() {
  await externalClustersGet();
}

main().catch(console.error);
