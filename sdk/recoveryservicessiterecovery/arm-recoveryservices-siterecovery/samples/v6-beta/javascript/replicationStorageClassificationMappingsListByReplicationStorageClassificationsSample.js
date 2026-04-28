// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the storage classification mappings for the fabric.
 *
 * @summary lists the storage classification mappings for the fabric.
 * x-ms-original-file: 2025-08-01/ReplicationStorageClassificationMappings_ListByReplicationStorageClassifications.json
 */
async function getsTheListOfStorageClassificationMappingsObjectsUnderAStorage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationStorageClassificationMappings.listByReplicationStorageClassifications(
    "resourceGroupPS1",
    "vault1",
    "2a48e3770ac08aa2be8bfbd94fcfb1cbf2dcc487b78fb9d3bd778304441b06a0",
    "8891569e-aaef-4a46-a4a0-78c14f2d7b09",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfStorageClassificationMappingsObjectsUnderAStorage();
}

main().catch(console.error);
