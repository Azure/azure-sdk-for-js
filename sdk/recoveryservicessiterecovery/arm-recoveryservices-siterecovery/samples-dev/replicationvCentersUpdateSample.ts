// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a registered vCenter.
 *
 * @summary the operation to update a registered vCenter.
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_Update.json
 */
async function updateVCenterOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.update(
    "MadhaviVRG",
    "MadhaviVault",
    "MadhaviFabric",
    "esx-78",
    { properties: { ipAddress: "10.150.109.25" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVCenterOperation();
}

main().catch(console.error);
