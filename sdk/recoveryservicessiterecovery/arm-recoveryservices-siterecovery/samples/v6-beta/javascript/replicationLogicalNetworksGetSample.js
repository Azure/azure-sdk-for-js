// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a logical network.
 *
 * @summary gets the details of a logical network.
 * x-ms-original-file: 2025-08-01/ReplicationLogicalNetworks_Get.json
 */
async function getsALogicalNetworkWithSpecifiedServerIdAndLogicalNetworkName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationLogicalNetworks.get(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "87ab394f-165f-4aa9-bd84-b018500b4509",
  );
  console.log(result);
}

async function main() {
  await getsALogicalNetworkWithSpecifiedServerIdAndLogicalNetworkName();
}

main().catch(console.error);
