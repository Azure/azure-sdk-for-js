// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server's DevOps audit settings.
 *
 * @summary gets a server's DevOps audit settings.
 * x-ms-original-file: 2025-02-01-preview/ServerDevOpsAuditGet.json
 */
async function getAServerDevOpsAuditSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverDevOpsAuditSettings.get(
    "devAuditTestRG",
    "devOpsAuditTestSvr",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAServerDevOpsAuditSettings();
}

main().catch(console.error);
