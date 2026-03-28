// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the vCenter servers registered in a fabric.
 *
 * @summary lists the vCenter servers registered in a fabric.
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_ListByReplicationFabrics.json
 */
async function getsTheListOfVCenterRegisteredUnderAFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationvCenters.listByReplicationFabrics(
    "MadhaviVRG",
    "MadhaviVault",
    "MadhaviFabric",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfVCenterRegisteredUnderAFabric();
}

main().catch(console.error);
