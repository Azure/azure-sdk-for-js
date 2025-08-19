// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all permissions the caller has for a resource.
 *
 * @summary Gets all permissions the caller has for a resource.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-05-01-preview/examples/GetResourcePermissions.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPermissionsForResource(): Promise<void> {
  const subscriptionId = process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["AUTHORIZATION_RESOURCE_GROUP"] || "rgname";
  const resourceProviderNamespace = "rpnamespace";
  const parentResourcePath = "parentResourcePath";
  const resourceType = "resourceType";
  const resourceName = "resourceName";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.permissions.listForResource(
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
  await listPermissionsForResource();
}

main().catch(console.error);
