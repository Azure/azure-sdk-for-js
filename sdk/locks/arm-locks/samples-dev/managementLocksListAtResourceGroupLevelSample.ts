// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the management locks for a resource group.
 *
 * @summary Gets all the management locks for a resource group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtResourceGroupLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function listManagementGroupsAtResourceGroupLevel(): Promise<void> {
  const subscriptionId = "subscriptionId";
  const resourceGroupName = "resourcegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managementLocks.listAtResourceGroupLevel(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listManagementGroupsAtResourceGroupLevel().catch(console.error);
