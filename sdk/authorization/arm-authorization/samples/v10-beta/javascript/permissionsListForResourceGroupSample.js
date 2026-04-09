// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all permissions the caller has for a resource group.
 *
 * @summary gets all permissions the caller has for a resource group.
 * x-ms-original-file: 2022-05-01-preview/GetPermissions.json
 */
async function listPermissionsForResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.permissions.listForResourceGroup("rgname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPermissionsForResourceGroup();
}

main().catch(console.error);
