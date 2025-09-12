// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the collection of outbound network dependencies for the given managed instance.
 *
 * @summary Gets the collection of outbound network dependencies for the given managed instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/ListOutboundNetworkDependenciesByManagedInstance.json
 */
async function getsTheCollectionOfOutboundNetworkDependenciesForTheGivenManagedInstance() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "20d7082a-0fc7-4468-82bd-542694d5042b";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const managedInstanceName = "testinstance";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listOutboundNetworkDependenciesByManagedInstance(
    resourceGroupName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getsTheCollectionOfOutboundNetworkDependenciesForTheGivenManagedInstance();
}

main().catch(console.error);
