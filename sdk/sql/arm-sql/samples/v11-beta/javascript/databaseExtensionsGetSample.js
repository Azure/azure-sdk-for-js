// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a database extension. This will return resource not found as it is not supported.
 *
 * @summary gets a database extension. This will return resource not found as it is not supported.
 * x-ms-original-file: 2025-02-01-preview/GetDatabaseExtensions.json
 */
async function getDatabaseExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a3473687-7581-41e1-ac24-6bcca5843f07";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databaseExtensions.get(
    "rg_a1f9d6f8-30d5-4228-9504-8a364361bca3",
    "srv_65858e0f-b1d1-4bdc-8351-a7da86ca4939",
    "11aa6c5e-58ed-4693-b303-3b8e3131deaa",
    "polybaseimport",
  );
}

async function main() {
  await getDatabaseExtensions();
}

main().catch(console.error);
