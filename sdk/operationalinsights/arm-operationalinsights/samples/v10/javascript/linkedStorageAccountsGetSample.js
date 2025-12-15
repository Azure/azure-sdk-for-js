// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all linked storage account of a specific data source type associated with the specified workspace.
 *
 * @summary Gets all linked storage account of a specific data source type associated with the specified workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/LinkedStorageAccountsGet.json
 */
async function linkedStorageAccountsGet() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "mms-eus";
  const workspaceName = "testLinkStorageAccountsWS";
  const dataSourceType = "CustomLogs";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedStorageAccounts.get(
    resourceGroupName,
    workspaceName,
    dataSourceType,
  );
  console.log(result);
}

async function main() {
  await linkedStorageAccountsGet();
}

main().catch(console.error);
