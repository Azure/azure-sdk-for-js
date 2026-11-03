// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add the administrator for root collection associated with this account.
 *
 * @summary add the administrator for root collection associated with this account.
 * x-ms-original-file: 2024-04-01-preview/Accounts_AddRootCollectionAdmin.json
 */
async function accountsAddRootCollectionAdmin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  await client.accounts.addRootCollectionAdmin("SampleResourceGroup", "account1", {
    objectId: "7e8de0e7-2bfc-4e1f-9659-2a5785e4356f",
  });
}

async function main(): Promise<void> {
  await accountsAddRootCollectionAdmin();
}

main().catch(console.error);
