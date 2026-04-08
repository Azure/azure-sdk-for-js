// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server trust group.
 *
 * @summary gets a server trust group.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupGet.json
 */
async function getServerTrustGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.get(
    "Default",
    "Japan East",
    "server-trust-group-test",
  );
  console.log(result);
}

async function main() {
  await getServerTrustGroup();
}

main().catch(console.error);
