// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameGetOperation_example.json
 */
async function getAnApplicationType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applicationTypes.get("resRg", "myCluster", "myAppType");
  console.log(result);
}

async function main() {
  await getAnApplicationType();
}

main().catch(console.error);
