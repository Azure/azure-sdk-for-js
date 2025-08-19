// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the management locks for a resource or any level below resource.
 *
 * @summary Gets all the management locks for a resource or any level below resource.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_ListAtResourceLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listManagementLocksAtResourceLevel(): Promise<void> {
  const subscriptionId = process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["LOCKS_RESOURCE_GROUP"] || "resourcegroupname";
  const resourceProviderNamespace = "Microsoft.Storage";
  const parentResourcePath = "parentResourcePath";
  const resourceType = "storageAccounts";
  const resourceName = "teststorageaccount";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managementLocks.listAtResourceLevel(
    resourceGroupName,
    resourceProviderNamespace,
    parentResourcePath,
    resourceType,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagementLocksAtResourceLevel();
}

main().catch(console.error);
