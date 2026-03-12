// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of vaults in the given subscription and resource group.
 *
 * @summary gets the list of vaults in the given subscription and resource group.
 * x-ms-original-file: 2024-09-01/Vault_List.json
 */
async function listsTheVaults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vault.list("rgrecoveryservicesdatareplication", {
    continuationToken: "mwculdaqndp",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheVaults();
}

main().catch(console.error);
