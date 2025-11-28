// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to contains data from encryption.keyVaultProperties as well as information about which private endpoint is used by each encryption sibling set. Response from this endpoint can be modified and used as request body for POST request.
 *
 * @summary contains data from encryption.keyVaultProperties as well as information about which private endpoint is used by each encryption sibling set. Response from this endpoint can be modified and used as request body for POST request.
 * x-ms-original-file: 2025-09-01-preview/Accounts_GetChangeKeyVaultInformation.json
 */
async function accountsGetChangeKeyVaultInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.getChangeKeyVaultInformation("myRG", "account1");
  console.log(result);
}

async function main(): Promise<void> {
  await accountsGetChangeKeyVaultInformation();
}

main().catch(console.error);
