// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves details about all subscriptions which are associated with the management group.
 *
 * @summary retrieves details about all subscriptions which are associated with the management group.
 * x-ms-original-file: 2023-04-01/GetAllSubscriptionsFromManagementGroup.json
 */
async function getAllSubscriptionsFromManagementGroup(): Promise<void> {
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

async function main(): Promise<void> {
  await getAllSubscriptionsFromManagementGroup();
}

main().catch(console.error);
