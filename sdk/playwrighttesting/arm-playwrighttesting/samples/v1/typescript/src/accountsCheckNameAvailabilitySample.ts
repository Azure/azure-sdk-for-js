// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds check global name availability operation, normally used if a resource name must be globally unique.
 *
 * @summary adds check global name availability operation, normally used if a resource name must be globally unique.
 * x-ms-original-file: 2024-12-01/Accounts_CheckNameAvailability.json
 */
async function accountsCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  const result = await client.accounts.checkNameAvailability({
    name: "dummyName",
    type: "Microsoft.AzurePlaywrightService/Accounts",
  });
  console.log(result);
}

async function main() {
  accountsCheckNameAvailability();
}

main().catch(console.error);
