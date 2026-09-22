// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the health details of the vault.
 *
 * @summary gets the health details of the vault.
 * x-ms-original-file: 2025-08-01/ReplicationVaultHealth_Get.json
 */
async function getsTheHealthSummaryForTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationVaultHealth.get("resourceGroupPS1", "vault1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheHealthSummaryForTheVault();
}

main().catch(console.error);
