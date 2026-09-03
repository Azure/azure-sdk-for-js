// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to refresh the information from the recovery services provider.
 *
 * @summary the operation to refresh the information from the recovery services provider.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryServicesProviders_RefreshProvider.json
 */
async function refreshDetailsFromTheRecoveryServicesProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryServicesProviders.refreshProvider(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "241641e6-ee7b-4ee4-8141-821fadda43fa",
  );
  console.log(result);
}

async function main() {
  await refreshDetailsFromTheRecoveryServicesProvider();
}

main().catch(console.error);
