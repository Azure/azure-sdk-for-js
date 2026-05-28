// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the networks available for a fabric.
 *
 * @summary lists the networks available for a fabric.
 * x-ms-original-file: 2025-08-01/ReplicationNetworks_ListByReplicationFabrics.json
 */
async function getsTheListOfNetworksUnderAFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationNetworks.listByReplicationFabrics(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
    "b0cef6e9a4437b81803d0b55ada4f700ab66caae59c35d62723a1589c0cd13ac",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfNetworksUnderAFabric();
}

main().catch(console.error);
