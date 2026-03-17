// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes health summary of the vault.
 *
 * @summary refreshes health summary of the vault.
 * x-ms-original-file: 2025-08-01/ReplicationVaultHealth_Refresh.json
 */
async function refreshesHealthSummaryOfTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationVaultHealth.refresh("resourceGroupPS1", "vault1");
  console.log(result);
}

async function main(): Promise<void> {
  await refreshesHealthSummaryOfTheVault();
}

main().catch(console.error);
