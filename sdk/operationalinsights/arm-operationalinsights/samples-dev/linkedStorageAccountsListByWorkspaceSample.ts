// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type.
 *
 * @summary Gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/2020-08-01/examples/LinkedStorageAccountsListByWorkspace.json
 */

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsListOfLinkedStorageAccountsOnAWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "mms-eus";
  const workspaceName = "testLinkStorageAccountsWS";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedStorageAccounts.listByWorkspace(
    resourceGroupName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfLinkedStorageAccountsOnAWorkspace();
}

main().catch(console.error);
