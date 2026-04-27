// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an account resource
 *
 * @summary deletes an account resource
 * x-ms-original-file: 2024-04-01-preview/Accounts_Delete.json
 */
async function accountsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  await client.accounts.delete("SampleResourceGroup", "account1");
}

async function main(): Promise<void> {
  await accountsDelete();
}

main().catch(console.error);
