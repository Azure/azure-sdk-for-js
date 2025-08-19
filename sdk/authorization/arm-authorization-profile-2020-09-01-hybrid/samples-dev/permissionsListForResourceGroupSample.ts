// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all permissions the caller has for a resource group.
 *
 * @summary Gets all permissions the caller has for a resource group.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetPermissions.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPermissionsForResourceGroup(): Promise<void> {
  const subscriptionId = process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "subID";
  const resourceGroupName = process.env["AUTHORIZATION_RESOURCE_GROUP"] || "rgname";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.permissions.listForResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPermissionsForResourceGroup();
}

main().catch(console.error);
