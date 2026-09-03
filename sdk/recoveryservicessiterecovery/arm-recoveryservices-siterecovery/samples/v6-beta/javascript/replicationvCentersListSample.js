// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the vCenter servers registered in the vault.
 *
 * @summary lists the vCenter servers registered in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_List.json
 */
async function getsTheListOfVCenterRegisteredUnderTheVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationvCenters.list("MadhaviVRG", "MadhaviVault")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfVCenterRegisteredUnderTheVault();
}

main().catch(console.error);
