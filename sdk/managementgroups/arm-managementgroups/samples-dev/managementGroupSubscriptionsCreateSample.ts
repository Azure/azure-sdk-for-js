// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Associates existing subscription with the management group.

 *
 * @summary Associates existing subscription with the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/AddManagementGroupSubscription.json
 */

import type { ManagementGroupSubscriptionsCreateOptionalParams } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function addSubscriptionToManagementGroup(): Promise<void> {
  const groupId = "Group";
  const subscriptionId = "728bcbe4-8d56-4510-86c2-4921b8beefbc";
  const cacheControl = "no-cache";
  const options: ManagementGroupSubscriptionsCreateOptionalParams = {
    cacheControl,
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroupSubscriptions.create(groupId, subscriptionId, options);
  console.log(result);
}

addSubscriptionToManagementGroup().catch(console.error);
