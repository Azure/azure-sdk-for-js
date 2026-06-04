// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if account name is available.
 *
 * @summary checks if account name is available.
 * x-ms-original-file: 2024-04-01-preview/Accounts_CheckNameAvailability.json
 */
async function accountsCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.checkNameAvailability({
    name: "account1",
    type: "Microsoft.Purview/accounts",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accountsCheckNameAvailability();
}

main().catch(console.error);
