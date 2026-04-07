// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a server's DevOps audit settings.
 *
 * @summary creates or updates a server's DevOps audit settings.
 * x-ms-original-file: 2025-02-01-preview/ServerDevOpsAuditCreateMax.json
 */
async function updateAServerDevOpsAuditSettingsWithAllParams() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverDevOpsAuditSettings.createOrUpdate(
    "devAuditTestRG",
    "devOpsAuditTestSvr",
    "Default",
    {
      isAzureMonitorTargetEnabled: true,
      state: "Enabled",
      storageAccountAccessKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      storageAccountSubscriptionId: "00000000-1234-0000-5678-000000000000",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a server's DevOps audit settings.
 *
 * @summary creates or updates a server's DevOps audit settings.
 * x-ms-original-file: 2025-02-01-preview/ServerDevOpsAuditCreateMin.json
 */
async function updateAServerDevOpsAuditSettingsWithMinimalInput() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverDevOpsAuditSettings.createOrUpdate(
    "devAuditTestRG",
    "devOpsAuditTestSvr",
    "Default",
    {
      state: "Enabled",
      storageAccountAccessKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      storageEndpoint: "https://mystorage.blob.core.windows.net",
    },
  );
  console.log(result);
}

async function main() {
  await updateAServerDevOpsAuditSettingsWithAllParams();
  await updateAServerDevOpsAuditSettingsWithMinimalInput();
}

main().catch(console.error);
