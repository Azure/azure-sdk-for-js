// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a server.
 *
 * @summary creates or updates a server.
 * x-ms-original-file: 2025-02-01-preview/ServerCreate.json
 */
async function createServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.servers.createOrUpdate("sqlcrudtest-7398", "sqlcrudtest-4645", {
    location: "Japan East",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "PLACEHOLDER",
    administrators: {
      azureADOnlyAuthentication: true,
      login: "bob@contoso.com",
      principalType: "User",
      sid: "00000011-1111-2222-2222-123456789111",
      tenantId: "00000011-1111-2222-2222-123456789111",
    },
    createMode: "Normal",
    isIPv6Enabled: "Enabled",
    publicNetworkAccess: "Enabled",
    restrictOutboundNetworkAccess: "Enabled",
    retentionDays: 7,
  });
  console.log(result);
}

async function main() {
  await createServer();
}

main().catch(console.error);
