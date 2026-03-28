// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to a add a protectable item to a protection container(Add physical server).
 *
 * @summary the operation to a add a protectable item to a protection container(Add physical server).
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainers_DiscoverProtectableItem.json
 */
async function addsAProtectableItemToTheReplicationProtectionContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainers.discoverProtectableItem(
    "MadhaviVRG",
    "MadhaviVault",
    "V2A-W2K12-660",
    "cloud_7328549c-5c37-4459-a3c2-e35f9ef6893c",
    { properties: { friendlyName: "Test", ipAddress: "10.150.2.3", osType: "Windows" } },
  );
  console.log(result);
}

async function main() {
  await addsAProtectableItemToTheReplicationProtectionContainer();
}

main().catch(console.error);
