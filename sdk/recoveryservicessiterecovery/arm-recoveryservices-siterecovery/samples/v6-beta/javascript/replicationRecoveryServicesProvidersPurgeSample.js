// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to purge(force delete) a recovery services provider from the vault.
 *
 * @summary the operation to purge(force delete) a recovery services provider from the vault.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryServicesProviders_Purge.json
 */
async function purgesRecoveryServiceProviderFromFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationRecoveryServicesProviders.purge(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "241641e6-ee7b-4ee4-8141-821fadda43fa",
  );
}

async function main() {
  await purgesRecoveryServiceProviderFromFabric();
}

main().catch(console.error);
