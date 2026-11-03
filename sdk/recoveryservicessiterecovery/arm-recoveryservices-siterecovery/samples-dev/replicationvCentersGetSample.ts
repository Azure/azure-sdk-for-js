// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of a registered vCenter server(Add vCenter server).
 *
 * @summary gets the details of a registered vCenter server(Add vCenter server).
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_Get.json
 */
async function getsTheDetailsOfAVCenter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.get(
    "MadhaviVRG",
    "MadhaviVault",
    "MadhaviFabric",
    "esx-78",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfAVCenter();
}

main().catch(console.error);
