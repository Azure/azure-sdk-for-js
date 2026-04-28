// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the registered recovery services providers for the specified fabric.
 *
 * @summary lists the registered recovery services providers for the specified fabric.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryServicesProviders_ListByReplicationFabrics.json
 */
async function getsTheListOfRegisteredRecoveryServicesProvidersForTheFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationRecoveryServicesProviders.listByReplicationFabrics(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfRegisteredRecoveryServicesProvidersForTheFabric();
}

main().catch(console.error);
