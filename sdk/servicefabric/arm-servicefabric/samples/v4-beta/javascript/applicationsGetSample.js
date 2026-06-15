// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: 2026-03-01-preview/ApplicationGetOperation_example.json
 */
async function getAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applications.get("resRg", "myCluster", "myApp");
  console.log(result);
}

async function main() {
  await getAnApplication();
}

main().catch(console.error);
