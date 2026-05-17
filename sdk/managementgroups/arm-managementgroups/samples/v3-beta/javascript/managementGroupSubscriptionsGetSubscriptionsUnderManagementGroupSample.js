// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves details about all subscriptions which are associated with the management group.
 *
 * @summary retrieves details about all subscriptions which are associated with the management group.
 * x-ms-original-file: 2023-04-01/GetAllSubscriptionsFromManagementGroup.json
 */
async function getAllSubscriptionsFromManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroupSubscriptions.getSubscriptionsUnderManagementGroup(
    "Group",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSubscriptionsFromManagementGroup();
}

main().catch(console.error);
