// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Account
 *
 * @summary create a Account
 * x-ms-original-file: 2024-12-01/Accounts_CreateOrUpdate.json
 */
async function accountsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate(
    "dummyrg",
    "myPlaywrightAccount",
    {
      location: "westus",
      tags: { Team: "Dev Exp" },
      properties: { regionalAffinity: "Enabled" },
    },
  );
  console.log(result);
}

async function main() {
  accountsCreateOrUpdate();
}

main().catch(console.error);
