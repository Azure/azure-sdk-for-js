// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of registered recovery services provider.
 *
 * @summary gets the details of registered recovery services provider.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryServicesProviders_Get.json
 */
async function getsTheDetailsOfARecoveryServicesProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryServicesProviders.get(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "241641e6-ee7b-4ee4-8141-821fadda43fa",
  );
  console.log(result);
}

async function main() {
  await getsTheDetailsOfARecoveryServicesProvider();
}

main().catch(console.error);
