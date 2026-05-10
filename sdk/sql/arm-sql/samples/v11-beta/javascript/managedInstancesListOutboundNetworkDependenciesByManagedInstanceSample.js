// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the collection of outbound network dependencies for the given managed instance.
 *
 * @summary gets the collection of outbound network dependencies for the given managed instance.
 * x-ms-original-file: 2025-02-01-preview/ListOutboundNetworkDependenciesByManagedInstance.json
 */
async function getsTheCollectionOfOutboundNetworkDependenciesForTheGivenManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20d7082a-0fc7-4468-82bd-542694d5042b";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listOutboundNetworkDependenciesByManagedInstance(
    "sqlcrudtest-7398",
    "testinstance",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheCollectionOfOutboundNetworkDependenciesForTheGivenManagedInstance();
}

main().catch(console.error);
