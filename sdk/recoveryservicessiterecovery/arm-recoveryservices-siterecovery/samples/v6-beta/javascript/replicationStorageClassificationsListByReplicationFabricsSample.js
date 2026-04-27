// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the storage classifications available in the specified fabric.
 *
 * @summary lists the storage classifications available in the specified fabric.
 * x-ms-original-file: 2025-08-01/ReplicationStorageClassifications_ListByReplicationFabrics.json
 */
async function getsTheListOfStorageClassificationObjectsUnderAFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationStorageClassifications.listByReplicationFabrics(
    "resourceGroupPS1",
    "vault1",
    "2a48e3770ac08aa2be8bfbd94fcfb1cbf2dcc487b78fb9d3bd778304441b06a0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfStorageClassificationObjectsUnderAFabric();
}

main().catch(console.error);
