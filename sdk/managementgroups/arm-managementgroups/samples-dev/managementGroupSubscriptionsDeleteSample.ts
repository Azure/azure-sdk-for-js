// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to De-associates subscription from the management group.

 *
 * @summary De-associates subscription from the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/RemoveManagementGroupSubscription.json
 */

import type { ManagementGroupSubscriptionsDeleteOptionalParams } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteSubscriptionFromManagementGroup(): Promise<void> {
  const groupId = "Group";
  const subscriptionId = "728bcbe4-8d56-4510-86c2-4921b8beefbc";
  const cacheControl = "no-cache";
  const options: ManagementGroupSubscriptionsDeleteOptionalParams = {
    cacheControl,
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroupSubscriptions.delete(groupId, subscriptionId, options);
  console.log(result);
}

deleteSubscriptionFromManagementGroup().catch(console.error);
