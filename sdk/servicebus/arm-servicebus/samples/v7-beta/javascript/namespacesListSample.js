// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the available namespaces within the subscription, irrespective of the resource groups.
 *
 * @summary gets all the available namespaces within the subscription, irrespective of the resource groups.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceList.json
 */
async function nameSpaceList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nameSpaceList();
}

main().catch(console.error);
