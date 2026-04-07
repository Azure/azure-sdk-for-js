// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists auditing settings of a server.
 *
 * @summary lists auditing settings of a server.
 * x-ms-original-file: 2025-02-01-preview/ServerAuditingSettingsList.json
 */
async function listAuditingSettingsOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverBlobAuditingPolicies.listByServer(
    "blobauditingtest-4799",
    "blobauditingtest-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAuditingSettingsOfAServer();
}

main().catch(console.error);
