// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes all linked storage accounts of a specific data source type associated with the specified workspace.
 *
 * @summary deletes all linked storage accounts of a specific data source type associated with the specified workspace.
 * x-ms-original-file: 2025-07-01/LinkedStorageAccountsDelete.json
 */
async function linkedStorageAccountsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.linkedStorageAccounts.delete("mms-eus", "testLinkStorageAccountsWS", "CustomLogs");
}

async function main() {
  await linkedStorageAccountsDelete();
}

main().catch(console.error);
