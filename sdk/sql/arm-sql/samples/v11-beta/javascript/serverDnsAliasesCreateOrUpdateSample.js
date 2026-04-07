// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a server DNS alias.
 *
 * @summary creates a server DNS alias.
 * x-ms-original-file: 2025-02-01-preview/ServerDnsAliasCreateOrUpdate.json
 */
async function createServerDNSAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverDnsAliases.createOrUpdate(
    "Default",
    "dns-alias-server",
    "dns-alias-name-1",
  );
  console.log(result);
}

async function main() {
  await createServerDNSAlias();
}

main().catch(console.error);
