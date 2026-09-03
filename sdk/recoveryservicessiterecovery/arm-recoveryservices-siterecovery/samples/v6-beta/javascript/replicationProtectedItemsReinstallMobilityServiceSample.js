// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to reinstall the installed mobility service software on a replication protected item to the latest available version.
 *
 * @summary the operation to reinstall the installed mobility service software on a replication protected item to the latest available version.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_ReinstallMobilityService.json
 */
async function reinstallTheMobilityServiceOnAProtectedItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b364ed8d-4279-4bf8-8fd1-56f8fa0ae05c";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.reinstallMobilityService(
    "wcusValidations",
    "WCUSVault",
    "WIN-JKKJ31QI8U2",
    "cloud_c6780228-83bd-4f3e-a70e-cb46b7da33a0",
    "79dd20ab-2b40-11e7-9791-0050568f387e",
    { properties: { runAsAccountId: "2" } },
  );
  console.log(result);
}

async function main() {
  await reinstallTheMobilityServiceOnAProtectedItem();
}

main().catch(console.error);
