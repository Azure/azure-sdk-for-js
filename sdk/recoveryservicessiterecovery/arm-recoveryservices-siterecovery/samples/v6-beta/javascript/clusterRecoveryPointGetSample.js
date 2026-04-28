// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of specified recovery point.
 *
 * @summary get the details of specified recovery point.
 * x-ms-original-file: 2025-08-01/ClusterRecoveryPoint_Get.json
 */
async function getsARecoveryPoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.clusterRecoveryPoint.get(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    "testcluster",
    "06b9ae7f-f21d-4a76-9897-5cf5d6004d80",
  );
  console.log(result);
}

async function main() {
  await getsARecoveryPoint();
}

main().catch(console.error);
