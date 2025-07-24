// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists of all the clusters in a environment
 *
 * @summary lists of all the clusters in a environment
 * x-ms-original-file: 2024-07-01/Organization_ClusterList.json
 */
async function organizationListClusters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listClusters(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    { pageSize: 10 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationListClusters();
}

main().catch(console.error);
