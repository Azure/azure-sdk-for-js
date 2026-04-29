// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server's DevOps audit settings.
 *
 * @summary gets a server's DevOps audit settings.
 * x-ms-original-file: 2025-02-01-preview/ServerDevOpsAuditGet.json
 */
async function getAServerDevOpsAuditSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverDevOpsAuditSettings.get(
    "devAuditTestRG",
    "devOpsAuditTestSvr",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getAServerDevOpsAuditSettings();
}

main().catch(console.error);
