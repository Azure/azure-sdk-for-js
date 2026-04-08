// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a managed server DNS alias.
 *
 * @summary creates a managed server DNS alias.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerDnsAliasCreateOrUpdate.json
 */
async function createManagedServerDNSAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.createOrUpdate(
    "Default",
    "dns-mi",
    "dns-alias-mi",
    {},
  );
  console.log(result);
}

async function main() {
  await createManagedServerDNSAlias();
}

main().catch(console.error);
