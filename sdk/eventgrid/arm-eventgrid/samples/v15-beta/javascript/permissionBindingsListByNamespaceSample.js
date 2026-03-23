// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the permission bindings under a namespace.
 *
 * @summary get all the permission bindings under a namespace.
 * x-ms-original-file: 2025-07-15-preview/PermissionBindings_ListByNamespace.json
 */
async function permissionBindingsListByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.permissionBindings.listByNamespace("examplerg", "namespace123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await permissionBindingsListByNamespace();
}

main().catch(console.error);
