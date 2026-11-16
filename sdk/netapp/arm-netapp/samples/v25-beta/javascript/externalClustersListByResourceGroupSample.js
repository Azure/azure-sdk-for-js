// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all External Clusters in the resource group
 *
 * @summary list all External Clusters in the resource group
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_ListByResourceGroup.json
 */
async function externalClustersListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalClusters.listByResourceGroup("contosoNetAppRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await externalClustersListByResourceGroup();
}

main().catch(console.error);
