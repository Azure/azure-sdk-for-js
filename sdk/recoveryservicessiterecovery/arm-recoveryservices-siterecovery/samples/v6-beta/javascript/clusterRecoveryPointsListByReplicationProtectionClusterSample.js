// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the list of cluster recovery points.
 *
 * @summary the list of cluster recovery points.
 * x-ms-original-file: 2025-08-01/ClusterRecoveryPoints_ListByReplicationProtectionCluster.json
 */
async function getsTheListOfClusterRecoveryPoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterRecoveryPoints.listByReplicationProtectionCluster(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    "testcluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfClusterRecoveryPoints();
}

main().catch(console.error);
