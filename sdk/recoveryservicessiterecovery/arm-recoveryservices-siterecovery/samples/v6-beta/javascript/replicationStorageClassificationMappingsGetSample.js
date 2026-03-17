// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the specified storage classification mapping.
 *
 * @summary gets the details of the specified storage classification mapping.
 * x-ms-original-file: 2025-08-01/ReplicationStorageClassificationMappings_Get.json
 */
async function getsTheDetailsOfAStorageClassificationMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationStorageClassificationMappings.get(
    "resourceGroupPS1",
    "vault1",
    "2a48e3770ac08aa2be8bfbd94fcfb1cbf2dcc487b78fb9d3bd778304441b06a0",
    "8891569e-aaef-4a46-a4a0-78c14f2d7b09",
    "testStorageMapping",
  );
  console.log(result);
}

async function main() {
  await getsTheDetailsOfAStorageClassificationMapping();
}

main().catch(console.error);
