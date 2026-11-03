// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the networks available in a vault.
 *
 * @summary lists the networks available in a vault.
 * x-ms-original-file: 2025-08-01/ReplicationNetworks_List.json
 */
async function getsTheListOfNetworksViewOnlyAPI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationNetworks.list(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfNetworksViewOnlyAPI();
}

main().catch(console.error);
