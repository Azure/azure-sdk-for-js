// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all clusters in a resource group.
 *
 * @summary lists all clusters in a resource group.
 * x-ms-original-file: 2023-03-02-preview/ClusterListByResourceGroup.json
 */
async function listTheClustersByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("TestGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheClustersByResourceGroup();
}

main().catch(console.error);
