// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Account
 *
 * @summary update a Account
 * x-ms-original-file: 2024-12-01/Accounts_Update.json
 */
async function accountsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  const result = await client.accounts.update(
    "dummyrg",
    "myPlaywrightAccount",
    {
      tags: { Team: "Dev Exp", Division: "LT" },
      properties: { regionalAffinity: "Enabled" },
    },
  );
  console.log(result);
}

async function main() {
  accountsUpdate();
}

main().catch(console.error);
