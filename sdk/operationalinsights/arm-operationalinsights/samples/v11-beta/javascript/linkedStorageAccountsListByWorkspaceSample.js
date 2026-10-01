// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type.
 *
 * @summary gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type.
 * x-ms-original-file: 2025-07-01/LinkedStorageAccountsListByWorkspace.json
 */
async function getsListOfLinkedStorageAccountsOnAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedStorageAccounts.listByWorkspace(
    "mms-eus",
    "testLinkStorageAccountsWS",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfLinkedStorageAccountsOnAWorkspace();
}

main().catch(console.error);
