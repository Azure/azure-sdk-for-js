// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all permissions the caller has for a resource.
 *
 * @summary gets all permissions the caller has for a resource.
 * x-ms-original-file: 2022-05-01-preview/GetResourcePermissions.json
 */
async function listPermissionsForResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.permissions.listForResource(
    "rgname",
    "rpnamespace",
    "parentResourcePath",
    "resourceType",
    "resourceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPermissionsForResource();
}

main().catch(console.error);
