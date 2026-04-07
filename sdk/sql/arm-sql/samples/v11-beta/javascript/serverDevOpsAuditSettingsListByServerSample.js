// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists DevOps audit settings of a server.
 *
 * @summary lists DevOps audit settings of a server.
 * x-ms-original-file: 2025-02-01-preview/ServerDevOpsAuditList.json
 */
async function listDevOpsAuditSettingsOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverDevOpsAuditSettings.listByServer(
    "devAuditTestRG",
    "devOpsAuditTestSvr",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDevOpsAuditSettingsOfAServer();
}

main().catch(console.error);
