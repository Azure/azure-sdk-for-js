// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a management lock at the resource group level.
 *
 * @summary Gets a management lock at the resource group level.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtResourceGroupLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function getManagementLockAtResourceGroupLevel(): Promise<void> {
  const subscriptionId = "subscriptionId";
  const resourceGroupName = "resourcegroupname";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.getAtResourceGroupLevel(resourceGroupName, lockName);
  console.log(result);
}

getManagementLockAtResourceGroupLevel().catch(console.error);
