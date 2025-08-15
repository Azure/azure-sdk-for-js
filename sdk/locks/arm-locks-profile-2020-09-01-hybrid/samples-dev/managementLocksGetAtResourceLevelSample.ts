// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the management lock of a resource or any level below resource.
 *
 * @summary Get the management lock of a resource or any level below resource.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_GetAtResourceLevel.json
 */
async function getManagementLockAtResourceLevel(): Promise<void> {
  const subscriptionId = process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["LOCKS_RESOURCE_GROUP"] || "resourcegroupname";
  const resourceProviderNamespace = "Microsoft.Storage";
  const parentResourcePath = "parentResourcePath";
  const resourceType = "storageAccounts";
  const resourceName = "teststorageaccount";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.getAtResourceLevel(
    resourceGroupName,
    resourceProviderNamespace,
    parentResourcePath,
    resourceType,
    resourceName,
    lockName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagementLockAtResourceLevel();
}

main().catch(console.error);
