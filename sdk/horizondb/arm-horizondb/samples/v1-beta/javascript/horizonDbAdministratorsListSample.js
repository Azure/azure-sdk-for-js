// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDB administrators in a cluster.
 *
 * @summary lists all HorizonDB administrators in a cluster.
 * x-ms-original-file: 2026-05-01-preview/Administrators_List.json
 */
async function listHorizonDBAdministratorsInACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbAdministrators.list(
    "exampleresourcegroup",
    "examplecluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDBAdministratorsInACluster();
}

main().catch(console.error);
