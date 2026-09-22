// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Service Fabric application type version resource with the specified name.
 *
 * @summary delete a Service Fabric application type version resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionDeleteOperation_example.json
 */
async function deleteAnApplicationTypeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  await client.applicationTypeVersions.delete("resRg", "myCluster", "myAppType", "1.0");
}

async function main() {
  await deleteAnApplicationTypeVersion();
}

main().catch(console.error);
