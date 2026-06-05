// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the configurations of a cluster.
 *
 * @summary list all the configurations of a cluster.
 * x-ms-original-file: 2023-03-02-preview/ConfigurationListByCluster.json
 */
async function listConfigurationsOfTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurations.listByCluster(
    "TestResourceGroup",
    "testcluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConfigurationsOfTheCluster();
}

main().catch(console.error);
