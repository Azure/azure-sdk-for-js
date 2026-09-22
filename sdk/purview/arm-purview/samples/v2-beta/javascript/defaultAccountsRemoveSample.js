// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the default account from the scope.
 *
 * @summary removes the default account from the scope.
 * x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Remove.json
 */
async function defaultAccountsRemove() {
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential);
  await client.defaultAccounts.remove("ee85a74c-405e-4adc-bb47-ffa8ca0c9f31", "Tenant", {
    scope: "12345678-1234-1234-1234-12345678abcd",
  });
}

async function main() {
  await defaultAccountsRemove();
}

main().catch(console.error);
