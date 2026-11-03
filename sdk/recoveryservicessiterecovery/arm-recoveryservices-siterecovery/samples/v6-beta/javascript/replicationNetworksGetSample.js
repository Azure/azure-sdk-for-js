// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a network.
 *
 * @summary gets the details of a network.
 * x-ms-original-file: 2025-08-01/ReplicationNetworks_Get.json
 */
async function getsANetworkWithSpecifiedServerIdAndNetworkName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationNetworks.get(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
    "b0cef6e9a4437b81803d0b55ada4f700ab66caae59c35d62723a1589c0cd13ac",
    "93ce99d7-1219-4914-aa61-73fe5023988e",
  );
  console.log(result);
}

async function main() {
  await getsANetworkWithSpecifiedServerIdAndNetworkName();
}

main().catch(console.error);
