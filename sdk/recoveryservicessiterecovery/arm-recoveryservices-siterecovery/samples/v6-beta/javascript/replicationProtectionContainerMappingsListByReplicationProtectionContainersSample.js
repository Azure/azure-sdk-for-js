// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the protection container mappings for a protection container.
 *
 * @summary lists the protection container mappings for a protection container.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainerMappings_ListByReplicationProtectionContainers.json
 */
async function getsTheListOfProtectionContainerMappingsForAProtectionContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionContainerMappings.listByReplicationProtectionContainers(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfProtectionContainerMappingsForAProtectionContainer();
}

main().catch(console.error);
