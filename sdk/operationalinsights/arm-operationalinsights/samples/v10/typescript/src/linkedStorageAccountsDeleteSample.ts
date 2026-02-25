// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes all linked storage accounts of a specific data source type associated with the specified workspace.
 *
 * @summary Deletes all linked storage accounts of a specific data source type associated with the specified workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/LinkedStorageAccountsDelete.json
 */
async function linkedStorageAccountsDelete(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "mms-eus";
  const workspaceName = "testLinkStorageAccountsWS";
  const dataSourceType = "CustomLogs";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.linkedStorageAccounts.delete(
    resourceGroupName,
    workspaceName,
    dataSourceType,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkedStorageAccountsDelete();
}

main().catch(console.error);
