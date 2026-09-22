// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all linked storage account of a specific data source type associated with the specified workspace.
 *
 * @summary gets all linked storage account of a specific data source type associated with the specified workspace.
 * x-ms-original-file: 2025-07-01/LinkedStorageAccountsGet.json
 */
async function linkedStorageAccountsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedStorageAccounts.get(
    "mms-eus",
    "testLinkStorageAccountsWS",
    "CustomLogs",
  );
  console.log(result);
}

async function main() {
  await linkedStorageAccountsGet();
}

main().catch(console.error);
