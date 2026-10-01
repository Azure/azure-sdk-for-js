// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric application resource with the specified name.
 *
 * @summary delete a Service Fabric application resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationDeleteOperation_example.json
 */
async function deleteAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  await client.applications.delete("resRg", "myCluster", "myApp");
}

async function main() {
  await deleteAnApplication();
}

main().catch(console.error);
