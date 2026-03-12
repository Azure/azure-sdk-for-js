// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to migrate an Azure Site Recovery fabric to AAD.
 *
 * @summary the operation to migrate an Azure Site Recovery fabric to AAD.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_MigrateToAad.json
 */
async function migratesTheSiteToAAD() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationFabrics.migrateToAad("resourceGroupPS1", "vault1", "cloud1");
}

async function main() {
  await migratesTheSiteToAAD();
}

main().catch(console.error);
