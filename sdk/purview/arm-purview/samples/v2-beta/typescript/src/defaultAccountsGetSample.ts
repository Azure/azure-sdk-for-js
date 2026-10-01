// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the default account for the scope.
 *
 * @summary get the default account for the scope.
 * x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Get.json
 */
async function defaultAccountsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential);
  const result = await client.defaultAccounts.get(
    "ee85a74c-405e-4adc-bb47-ffa8ca0c9f31",
    "Tenant",
    { scope: "12345678-1234-1234-1234-12345678abcd" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await defaultAccountsGet();
}

main().catch(console.error);
