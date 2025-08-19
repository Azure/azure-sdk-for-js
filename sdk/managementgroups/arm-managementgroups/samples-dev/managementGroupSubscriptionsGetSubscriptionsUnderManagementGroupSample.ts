// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves details about all subscriptions which are associated with the management group.

 *
 * @summary Retrieves details about all subscriptions which are associated with the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetAllSubscriptionsFromManagementGroup.json
 */

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function getAllSubscriptionsFromManagementGroup(): Promise<void> {
  const groupId = "Group";
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroupSubscriptions.listSubscriptionsUnderManagementGroup(
    groupId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

getAllSubscriptionsFromManagementGroup().catch(console.error);
